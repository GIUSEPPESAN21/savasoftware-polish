import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de SAVA Software, una empresa especializada en soluciones tecnológicas de Inteligencia Artificial para los sectores de Salud e Ingeniería en Colombia.

INFORMACIÓN SOBRE SAVA SOFTWARE:
- Fundada por 3 cofundadores: Joseph Sanchez (Data Scientist & AI Engineer), Jaime Vera (AI & Automation Engineer) y Xammy Sánchez (Business & Digital Solutions Lead)
- Ofrecen soluciones de IA a medida para automatizar, optimizar y escalar operaciones
- Sectores principales: Salud e Ingeniería
- Ubicación: Colombia
- Contacto: joseph.sanchez@uniminuto.edu.co, +57 322 207 4527
- LinkedIn: SAVA Software

SERVICIOS PRINCIPALES:
1. Consultoría en IA: Análisis y diseño de soluciones personalizadas
2. Automatización Inteligente: Optimización de procesos con IA
3. Desarrollo de Software: Aplicaciones a medida con tecnología de vanguardia
4. Análisis de Datos: Transformar datos en insights accionables

PRODUCTOS:
1. COLIBRI: Asistentes virtuales inteligentes potenciados con IA generativa
2. Soluciones personalizadas para cada cliente

CASOS DE ÉXITO:
- Clínica del Norte: +40% mejora en eficiencia diagnóstica
- Hospital San José: -35% reducción en tiempo de análisis
- Constructora Andina: +28% incremento en productividad

INSTRUCCIONES:
- Responde en español de forma amigable y profesional
- Sé conciso pero informativo
- Si te preguntan algo que no sabes sobre SAVA, sugiere contactar directamente
- Ofrece ayuda para agendar una consulta cuando sea apropiado
- Máximo 3-4 oraciones por respuesta`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages?.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

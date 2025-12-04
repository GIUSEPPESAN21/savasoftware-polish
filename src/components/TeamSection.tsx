import { Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import teamJoseph from "@/assets/team-joseph.png";
import teamJaime from "@/assets/team-jaime.png";
import teamXammy from "@/assets/team-xammy.png";

const team = [
  {
    name: "Joseph Javier Sánchez Acuña",
    role: "CEO & Co-Founder",
    titles: ["Ingeniero Industrial", "Desarrollador de Software", "Experto en IA"],
    description:
      "Arquitecto de la visión de SAVA. Combina pensamiento sistémico de ingeniería con construcción de soluciones tecnológicas precisas.",
    linkedin: "https://linkedin.com/in/joseph-javier-sánchez-acuña-150410275",
    email: "joseph.sanchez@uniminuto.edu.co",
    image: teamJoseph,
  },
  {
    name: "Jaime Eduardo Aragón Campo",
    role: "COO & Co-Founder",
    titles: ["Ingeniero Industrial", "Gestor de Proyectos", "Analista de Datos", "Experto en IA"],
    description:
      "Líder de ejecución operativa. Combina análisis estadístico riguroso con visión estratégica para construir soluciones innovadoras.",
    linkedin: "#",
    email: "#",
    image: teamJaime,
  },
  {
    name: "Xammy Alexander Victoria Gonzalez",
    role: "CCO & Co-Founder",
    titles: ["Tecnólogo en Electrónica", "Ingeniero Industrial", "Master en Ciencia de Datos"],
    description:
      "Responsable de estrategia comercial. Puente entre mercado y desarrollo, asegurando propuesta de valor clara y ROI tangible.",
    linkedin: "#",
    email: "#",
    image: teamXammy,
  },
];

export function TeamSection() {
  return (
    <section id="equipo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Nuestro Liderazgo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            El <span className="gradient-text">Equipo</span> detrás de SAVA
          </h2>
          <p className="text-lg text-muted-foreground">
            Expertos comprometidos con la excelencia tecnológica y la innovación
            aplicada.
          </p>
        </div>

        {/* Team Grid - Improved Layout */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card
              key={member.name}
              className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative p-0">
                {/* Image Container - Professional aspect ratio */}
                <div className="team-image-container bg-gradient-to-b from-muted to-muted/50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Info Section */}
                <div className="p-6 pt-4 text-center relative -mt-12 bg-gradient-to-t from-card from-60%">
                  <h3 className="text-xl font-bold text-card-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>

                  {/* Titles */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {member.titles.map((title) => (
                      <span
                        key={title}
                        className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {title}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {member.linkedin !== "#" && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.email !== "#" && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        aria-label={`Email de ${member.name}`}
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

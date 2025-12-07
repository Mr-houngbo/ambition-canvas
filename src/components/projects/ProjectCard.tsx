import { Project, STATUS_LABELS, STATUS_COLORS, HORIZON_LABELS, HORIZON_COLORS } from '@/types/project';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/projet/${project.id}`}>
        <Card hover className="group overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-secondary">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.titre}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-3xl font-bold gradient-text">
                    {project.titre.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            
            {/* Status Badge Overlay */}
            <div className="absolute top-3 left-3">
              <Badge className={STATUS_COLORS[project.statut]}>
                {STATUS_LABELS[project.statut]}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            {/* Category & Horizon */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {project.categorie}
              </span>
              <span className="text-muted-foreground">•</span>
              <Badge variant="secondary" className={HORIZON_COLORS[project.horizon_temps]}>
                {HORIZON_LABELS[project.horizon_temps]}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {project.titre}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
              {project.description_courte}
            </p>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="tag-chip"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="tag-chip">+{project.tags.length - 3}</span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(project.date_creation).toLocaleDateString('fr-FR')}</span>
              </div>
              
              <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Voir plus
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;

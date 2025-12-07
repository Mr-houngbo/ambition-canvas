import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  ProjectFormData,
  STATUS_LABELS,
  HORIZON_LABELS,
  CATEGORIES,
  ProjectStatus,
  TimeHorizon,
  Project,
} from '@/types/project';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: ProjectFormData, imageFile?: File) => Promise<void>;
  isLoading?: boolean;
}

const ProjectForm = ({ initialData, onSubmit, isLoading }: ProjectFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    titre: initialData?.titre || '',
    categorie: initialData?.categorie || CATEGORIES[0],
    description_courte: initialData?.description_courte || '',
    description_detaillee: initialData?.description_detaillee || '',
    statut: initialData?.statut || 'idee',
    horizon_temps: initialData?.horizon_temps || 'moyen_terme',
    tags: initialData?.tags || [],
    motivation: initialData?.motivation || '',
    ressources: initialData?.ressources || '',
    est_public: initialData?.est_public || false,
    image_url: initialData?.image_url || null,
  });

  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url || null
  );

  const handleChange = (
    field: keyof ProjectFormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    handleChange('tags', formData.tags.filter((t) => t !== tag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Fichier trop volumineux',
          description: 'L\'image ne doit pas dépasser 5 Mo.',
          variant: 'destructive',
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    handleChange('image_url', null as unknown as string);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titre.trim()) {
      toast({
        title: 'Titre requis',
        description: 'Veuillez entrer un titre pour votre projet.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await onSubmit(formData, imageFile || undefined);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement.',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <Card className="p-6">
          <Label className="text-base font-medium mb-4 block">Image du projet</Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer
              transition-all duration-200 hover:border-primary/50
              ${imagePreview ? 'border-transparent' : 'border-border'}
            `}
          >
            {imagePreview ? (
              <div className="relative aspect-video">
                <img
                  src={imagePreview}
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-sm"
                  className="absolute top-3 right-3 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <ImageIcon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Cliquez pour ajouter une image
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG jusqu'à 5 Mo
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </Card>

        {/* Basic Info */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => handleChange('titre', e.target.value)}
              placeholder="Mon projet ambitieux..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={formData.categorie}
                onValueChange={(value) => handleChange('categorie', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={formData.statut}
                onValueChange={(value) => handleChange('statut', value as ProjectStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Horizon</Label>
              <Select
                value={formData.horizon_temps}
                onValueChange={(value) => handleChange('horizon_temps', value as TimeHorizon)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(HORIZON_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_courte">Description courte</Label>
            <Input
              id="description_courte"
              value={formData.description_courte}
              onChange={(e) => handleChange('description_courte', e.target.value)}
              placeholder="Une phrase qui résume le projet..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_detaillee">Description détaillée</Label>
            <Textarea
              id="description_detaillee"
              value={formData.description_detaillee}
              onChange={(e) => handleChange('description_detaillee', e.target.value)}
              placeholder="Décrivez votre projet en détail..."
              className="min-h-[150px]"
            />
          </div>
        </Card>

        {/* Tags & Details */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Ajouter un tag..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddTag}>
                Ajouter
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Motivation</Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleChange('motivation', e.target.value)}
              placeholder="Pourquoi ce projet vous tient à cœur..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ressources">Ressources</Label>
            <Textarea
              id="ressources"
              value={formData.ressources}
              onChange={(e) => handleChange('ressources', e.target.value)}
              placeholder="Liens, outils, références utiles..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="est_public"
              checked={formData.est_public}
              onChange={(e) => handleChange('est_public', e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <Label htmlFor="est_public" className="cursor-pointer">
              Rendre ce projet visible dans le portfolio public
            </Label>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={isLoading}
            className="sm:order-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {initialData ? 'Mettre à jour' : 'Créer le projet'}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectForm;

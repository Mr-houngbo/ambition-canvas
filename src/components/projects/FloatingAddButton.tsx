import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FloatingAddButtonProps {
  defaultCategory?: string;
}

const FloatingAddButton = ({ defaultCategory }: FloatingAddButtonProps) => {
  const to = defaultCategory ? `/ajouter?category=${encodeURIComponent(defaultCategory)}` : '/ajouter';
  
  return (
    <Link to={to}>
      <Button
        variant="floating"
        size="icon-xl"
        className="fixed bottom-6 right-6 z-50"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </Link>
  );
};

export default FloatingAddButton;

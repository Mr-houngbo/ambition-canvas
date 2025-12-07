import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FloatingAddButton = () => {
  return (
    <Link to="/ajouter">
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

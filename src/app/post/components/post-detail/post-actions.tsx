import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface PostActionsProps {
  showActions: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function PostActions({ showActions, onEdit, onDelete }: PostActionsProps) {
  return (
    <div>
      {showActions && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-2 size-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from './textarea';

interface InputListProps {
  list: string[];
  onListChange: (updatedList: string[]) => void;
  placeholder: string;
}

export function InputList({ list, onListChange, placeholder }: InputListProps) {
  const [currentItem, setCurrentItem] = useState('');

  const handleAddItem = () => {
    if (currentItem.trim()) {
      onListChange([...list, currentItem.trim()]);
      setCurrentItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    onListChange(list.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    onListChange(newList);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <div className="w-full space-y-1">
      <div className="space-y-1">
        {list.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Textarea
              value={item}
              onChange={(e) => handleUpdateItem(index, e.target.value)}
              className="flex-1 h-1"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => handleRemoveItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex gap-2">
          <Textarea
            placeholder={placeholder}
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
            onKeyPress={handleKeyPress}
            className={cn(
              'flex-1',
              !currentItem.trim() && 'focus-visible:ring-destructive'
            )}
          />
          <Button
            onClick={handleAddItem}
            disabled={!currentItem.trim()}
            className="gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

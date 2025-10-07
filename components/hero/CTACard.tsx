import React from 'react';
import { Card } from '../ui/card';

interface CTACardProps {
  title: string;
  description: string;
}

const CTACard = ({ title, description }: CTACardProps) => {
  return (
    <Card className="flex flex-col border border-neutral-800 text-center p-0 bg-neutral-900">
      <h3 className="font-bold bg-neutral-800 rounded-t-md text-white ">
        {title}
      </h3>
      <p className="text-xs text-gray-200 pb-3 px-2">
        {description}
      </p>

    </Card>
  );
};

export default CTACard;

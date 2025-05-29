import React from 'react';
import LiveCard from '../../data/LiveCard';

interface FashionContent {
  id: string;
  title: string;
  host: string;
  thumbnail: string;
  viewers?: number;
  type?: string;
}

const Fashion: React.FC = () => {
  const fashionContent: FashionContent[] = [
    {
      id: '1',
      title: 'Live with Sarah',
      host: 'Sarah',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '2',
      title: 'Tech Talk with Mark',
      host: 'Mark',
      thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '3',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '4',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '5',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '6',
      title: 'Live with Sarah',
      host: 'Sarah',
      thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '7',
      title: 'Tech Talk with Mark',
      host: 'Mark',
      thumbnail: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '8',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '9',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '10',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '11',
      title: 'Live with Sarah',
      host: 'Sarah',
      thumbnail: 'https://images.unsplash.com/photo-1536243298547-ea894ed2eb08?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '12',
      title: 'Tech Talk with Mark',
      host: 'Mark',
      thumbnail: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '13',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '14',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '15',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '16',
      title: 'Live with Sarah',
      host: 'Sarah',
      thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '17',
      title: 'Tech Talk with Mark',
      host: 'Mark',
      thumbnail: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '18',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '19',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '20',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[28px] font-medium text-[#FF4D00]">Fashion</h2>
        <a href="/live-shop/fashion" className="text-sm text-gray-600 hover:text-gray-900">
          See All
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {fashionContent.map((item) => (
          <LiveCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Fashion; 
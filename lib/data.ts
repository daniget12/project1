export interface Tutor {
  id: string;
  name: string;
  subject: string;
  subjects: string[];
  rating: number;
  reviewsCount: number;
  rate: number;
  imageUrl: string;
  bio: string;
  languages: string[];
}

export const SAMPLE_TUTORS: Tutor[] = [
  {
    id: '1',
    name: 'Abebe Bikila',
    subject: 'Mathematics',
    subjects: ['Algebra', 'Calculus', 'Geometry'],
    rating: 4.9,
    reviewsCount: 124,
    rate: 25,
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    bio: 'An experienced mathematics teacher with over 10 years of experience helping students excel in advanced calculus and algebra. I believe in making complex concepts simple and relatable.',
    languages: ['Amharic', 'English'],
  },
  {
    id: '2',
    name: 'Aster Aweke',
    subject: 'English',
    subjects: ['Literature', 'Creative Writing', 'ESL'],
    rating: 5.0,
    reviewsCount: 89,
    rate: 30,
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bio: 'Passionate about languages and literature. I help students not only improve their grammar and vocabulary but also discover the joy of reading and creative expression.',
    languages: ['English', 'Amharic', 'Oromo'],
  },
  {
    id: '3',
    name: 'Teddy Afro',
    subject: 'Music',
    subjects: ['Vocals', 'Guitar', 'Music Theory'],
    rating: 4.8,
    reviewsCount: 215,
    rate: 20,
    imageUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    bio: 'Professional musician and vocal coach. Whether you are a beginner looking to pick up the guitar or an advanced singer wanting to refine your technique, I can help you reach your goals.',
    languages: ['Amharic', 'English'],
  },
  {
    id: '4',
    name: 'Sara Kidan',
    subject: 'Physics',
    subjects: ['Classical Mechanics', 'Quantum Physics', 'High School Physics'],
    rating: 4.7,
    reviewsCount: 56,
    rate: 35,
    imageUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712e',
    bio: 'PhD candidate in Theoretical Physics. I enjoy breaking down the laws of the universe into digestible, intuitive lessons for high school and college students.',
    languages: ['English', 'French'],
  },
  {
    id: '5',
    name: 'Dawit Mekonnen',
    subject: 'Computer Science',
    subjects: ['Python', 'Web Development', 'Data Structures'],
    rating: 4.9,
    reviewsCount: 178,
    rate: 40,
    imageUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712f',
    bio: 'Senior Software Engineer turned educator. I teach practical, real-world coding skills that prepare you for the tech industry, focusing on modern web development and algorithms.',
    languages: ['Amharic', 'English'],
  }
];

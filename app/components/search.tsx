import { useState } from 'react';
import { getAllExpertUserWithChoicesInsecure } from '../../database/experts';

export default function SearchForExperts() {
  const [filteredExperts, setFilteredExperts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const expertUsers = getAllExpertUserWithChoicesInsecure();
  console.log(
    'expertUsers#################################################################',
    expertUsers,
  );
}

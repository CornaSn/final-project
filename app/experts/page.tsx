import Image from 'next/image';
import {
  getAllExpertsWithUserInfoInsecure,
  getExpertsInsecure,
} from '../../database/experts';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

// export default async function Users() {
//   const experts = await getExpertsInsecure();
//   console.log('Experts:', experts);

export default async function Experts() {
  const experts = await getAllExpertsWithUserInfoInsecure();
  console.log('experts with user info', experts);

  return (
    <div className="card m-4 w-100 shadow">
      <div>
        <h1>Experts:</h1>
        {experts.map((expert) => (
          <a key={`experts-${expert.id}`}>
            <div>{expert.age}</div>
            <div>{expert.bio}</div>
            <div>
              <Image
                src={expert.pictureUrl}
                alt="No alt text for image"
                height="200"
                width="200"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

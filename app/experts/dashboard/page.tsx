import {
  getAllExpertsWithUserInfoInsecure,
  getExpertWithUserById,
} from '../../../database/experts';
import ExpertsForm from './ExpertForm';

export default async function Experts() {
  const experts = await getAllExpertsWithUserInfoInsecure();
  // console.log('users expert', experts);
  return <ExpertsForm experts={experts} />;
}

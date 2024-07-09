import { getAllExpertInfosWithChoicesInsecure } from '../../database/experts';

const userInfo = await getAllExpertInfosWithChoicesInsecure();

export default function Test() {
  return <div>Hello Whats up</div>;
}

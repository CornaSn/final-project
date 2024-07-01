type Props = {
  params: {
    email: string;
    firstName: string;
    lastName: string;
    userId: number;
  };
};

export default function UserProfil(props: Props) {
  console.log('Props', props);
  return (
    <>
      <div>User Profil</div>
      <h1>{props.params.userId}</h1>
    </>
  );
}

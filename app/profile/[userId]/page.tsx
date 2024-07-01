type Props = {
  params: {
    email: string;
  };
};

export default function UserProfil(props: Props) {
  return (
    <>
      <h1>{props.params.email}</h1>
      <div>User Profil</div>
    </>
  );
}

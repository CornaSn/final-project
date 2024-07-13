# travelgenius

Travelgenius is a full-stack web application designed to match travel-experts with users based on the desired country and interest areas. It allows users to find their matches and get in touch with the experts.

## Features

- Landing Page
- User authorization and authentification (Login/Logout)
- Profile page incl. image and video upload
- Search functionality based on interest
- Algorithm for matching experts with users

## Technologies

- React
- Next.js
- Typescript
- Node.js\Javascript
- HTML
- Tailwind CSS

### External Technologies:

- Cloudinary

## Screenshot

tba

## Prototyping

- [Fimga](https://www.figma.com/design/79B5EEm3syK8xJVof2RdeS/Untitled?node-id=0-1&t=yedTwvahBEsAsF2x-0)
- [DrawSQL](https://drawsql.app/teams/cornasns-team/diagrams/final-projekt)

## Setup

1. Clone the repository

```
git clone LINK
cd travelgenius
```

2. Install dependencies using

```
pnpm add
```

3. Setup postgress database
   Create a .env file in the root directory and add the following:

```
PGHOST=localhost
PGUSERNAME=<your username>
PGPASSWORD=<your password>
PGDATABASE=<your database>
```

4. Connect to postgres and run either:
   Windows and macOS:

```
psql -U <user name> <database name>

```

Linux:

```
sudo -u <user name> psql -U <user name> <database name>

```

5. Run migration

```
pnpm migrate up
```

6. Run application

```
pnpm dev
```

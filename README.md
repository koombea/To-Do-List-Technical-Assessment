# **YATDLA**
**Y**et **A**nother **T**o **D**o **L**ist **A**pp.

## Tech Stack used:

 - Next.JS

- React.JS
- TypeScript
- GraphQL with Apollo
- Prisma
- PostgreSQL
- StyledComponents

## Set-up
Localize the `~.env` file and change `USER`, `PASSWORD`, `DB_NAME` and `SHADOW_DB_NAME` for your database credentials.
```
npm install
```
```
npx prisma migrate dev --name init
```
```
npm run dev
```
Go to `http://localhost:3000/` to see the app running.

Go to `http://localhost:3000/api/graphql` to see the GraphQL playground.

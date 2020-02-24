docker-compose up -d
prisma deploy --force
prisma generate
npm init -y
npm install
npm start
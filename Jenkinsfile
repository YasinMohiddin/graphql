pipeline
{
    agent any
    environment
    {
        JWT_SECRET=my-super-secret-jwt-key
        MONGODB_URI=mongodb+srv://Firoz_Shaik_:bj7B8w4g8bmXOgCo@mydb-f.xxjy1.mongodb.net/todoapp
        NODE_ENV=development
    }
    stages
    {
        stage('Download code')
        {
            steps
            {
                git 'https://github.com/YasinMohiddin/graphql.git'
            }
            }
        stage('Install dependencies')
        {
            steps
            {
                sh 'npm install'
                sh 'npm run prod'
                sh 'npm run build'
            }
        }
        stage('Run tests')
        {
            steps
            {
                sh 'npm test'
            }
        }
    }
}
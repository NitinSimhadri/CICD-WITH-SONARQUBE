pipeline {
    agent any
 
    environment {
        DOCKER_IMAGE = "poc-secure-api"
        CONTAINER_NAME = "poc-container"
    }
 
    stages {
 
        stage('Checkout') {
            steps {
                git 'https://github.com/NitinSimhadri/CICD-WITH-SONARQUBE.git'
            }
        }
 
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
 
        stage('Run Tests') {
            steps {
                sh 'npm test || true'
            }
        }
 
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=poc-secure-api \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://16.176.161.129:9000 \
                    -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }
 
        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
 
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t poc-secure-api .'
            }
        }
 
        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f poc-container || true
                docker run -d -p 3000:3000 --name poc-container poc-secure-api
                '''
            }
        }
    }
 
    post {
        success {
            echo "Pipeline SUCCESS"
        }
        failure {
            echo "Pipeline FAILED"
        }
    }
}
 

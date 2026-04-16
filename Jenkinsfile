pipeline {
    agent any
 
    tools {
        nodejs 'nodejs'
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
                sh 'npm test'
            }
        }
 
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    sh 'npx sonar-scanner'
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
    }
}

pipeline {
    agent any

    environment {
        DOCKER_IMAGE   = "poc-secure-api"
        CONTAINER_NAME = "poc-container"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NitinSimhadri/CICD-WITH-SONARQUBE.git'
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
                    script {
                        def scannerHome = tool(
                            name: 'SonarScanner',
                            type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                        )

                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                          -Dsonar.projectKey=poc-secure-api \
                          -Dsonar.sources=.
                        """
                    }
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
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                sh """
                docker rm -f ${CONTAINER_NAME} || true
                docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline Success – Deployment Done"
        }
        failure {
            echo "❌ Pipeline Failed – Check SonarQube Issues"
        }
    }
}


pipeline {

    agent any

 

    environment {

        SONAR_SCANNER = "/opt/sonar-scanner/bin/sonar-scanner"

        DOCKER_IMAGE = "poc-secure-api"

        CONTAINER_NAME = "poc-container"

    }

 

    stages {

 

        stage('Checkout Code') {

            steps {

                git credentialsId: 'github-creds', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'

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

                    sh """

                    ${SONAR_SCANNER} \

                    -Dsonar.projectKey=poc-secure-api \

                    -Dsonar.sources=. \

                    -Dsonar.host.url=http://16.176.161.129:9000 \

                    -Dsonar.login=$SONAR_AUTH_TOKEN

                    """

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

                sh 'docker build -t $DOCKER_IMAGE .'

            }

        }

 

        stage('Run Container') {

            steps {

                sh '''

                docker rm -f $CONTAINER_NAME || true

                docker run -d -p 3000:3000 --name $CONTAINER_NAME $DOCKER_IMAGE

                '''

            }

        }

    }

 

    post {

        success {

            echo "✅ Pipeline Success - Deployment Done"

        }

        failure {

            echo "❌ Pipeline Failed - Check Sonar Issues"

        }

    }

}

pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = 'a7d50e5c-36b3-464f-aa85-81d0a498ce09'
        DOCKER_REGISTRY    = 'https://registry.hub.docker.com'
        DOCKER_NAMESPACE   = 'spaceavocado34'
        IMAGE_NAME         = 'web-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'd1a07e22-e482-4351-88a6-2f40c9a760a9',
                    url: 'https://github.com/kuba-bogacki/docgen-client',
                    branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_NAMESPACE}/${IMAGE_NAME}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS}") {
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            sh 'docker system prune -af'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
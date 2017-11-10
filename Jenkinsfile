properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  disableConcurrentBuilds()
]

@Library('holisticon-build-library')
def nodeJS = new de.holisticon.ci.jenkins.NodeJS()

node {
  def buildNumber = env.BUILD_NUMBER
  def branchName = env.BRANCH_NAME
  def workspace = env.WORKSPACE
  def buildUrl = env.BUILD_URL

  // PRINT ENVIRONMENT TO JOB
  echo "workspace directory is $workspace"
  echo "build URL is $buildUrl"
  echo "build Number is $buildNumber"
  echo "branch name is $branchName"
  echo "PATH is $env.PATH"

  try {
    stage('Clean workspace') {
      deleteDir()
    }

    stage('Checkout') {
      checkout scm
    }

    stage('Build') {
      sh "npm run clean"
      sh "npm run build"
    }

    stage('Test') {
      //sh "npm run test"
      //junit 'target/test-reports/TEST*.xml'
      sh "npm run e2e"
      junit 'target/e2e-reports/TEST*.xml'
    }

    stage('Publish NPM snapshot') {
      nodeJS.publishSnapshot('.', "${buildNumber}", "${branchName}")
    }

  } catch (e) {
    rocketSend channel: 'holi-oss', emoji: ':rotating_light:', message: 'Fehler'
    throw e
  }

}

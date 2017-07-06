properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  disableConcurrentBuilds()
]

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
      def currentVersion = sh(returnStdout: true, script: "npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 4").trim()
      def newVersion = "${currentVersion}-${branchName}-${buildNumber}"
      sh "npm version ${newVersion} --no-git-tag-version && npm publish --tag next"
    }

  } catch (e) {
    rocketSend channel: 'holi-oss', emoji: ':rotating_light:', message: 'Fehler'
    throw e
  }

}

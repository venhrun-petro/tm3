#!/bin/bash
#
# Author:       Mark Kyle
# Description:  Creates new release in Octopus from GitLab CI. Accepts 3 arguments:
#                - Argument 1: Octopus project ID
#                - Argument 2: Version number
#                - Argument 3: Release notes
# Example:      ./octopus-release.sh Projects-123 2.7.8-1234 Bugfix-1234

# Variable declaration
PROJECT_ID=$1
VERSION_NUMBER=$2
RELEASE_NOTES="$(echo $3 | sed "s/\"/'/g")"  # removes extra double quotes

# Function declaration
function error_message() {
  echo "$1 was not supplied as an argument"
  echo "Example: ./octopus-release.sh Projects-123 2.7.8-1234 Bugfix-1234"
  exit 1
}

# Script start
if [ -z "$PROJECT_ID" ]; then
  error_message "Project ID"
elif  [ -z "$VERSION_NUMBER" ]; then
  error_message "Version number"
elif  [ -z "$RELEASE_NOTES" ]; then
  error_message "Release notes"
else

  STATUS=$(curl -s -i -o /dev/null -w '%{http_code}' --request POST --url https://octopus.tm2app.local/api/releases --header "content-type: application/json" --header "x-octopus-apikey: $OCTOPUS_APIKEY" --data "{\"ReleaseNotes\":\"Branch: [$CI_COMMIT_REF_NAME]($CI_PROJECT_URL/commits/$CI_COMMIT_REF_NAME)<br/>Pipeline #: [$CI_PIPELINE_ID]($CI_PROJECT_URL/pipelines/$CI_PIPELINE_ID)<br/>Commit: [$CI_COMMIT_SHA]($CI_PROJECT_URL/commit/$CI_COMMIT_SHA)<br/><hr>**Release notes**: $RELEASE_NOTES\",\"ProjectId\":\"$PROJECT_ID\",\"Version\":\"$VERSION_NUMBER\"}")

  if [ $STATUS -eq 201 ]; then
    echo "Release $VERSION_NUMBER created successfully"
  else
    echo "Status code $STATUS returned. Something went wrong :("
    exit 1
  fi
fi
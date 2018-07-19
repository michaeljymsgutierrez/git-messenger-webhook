# !/bin/bash
# Created by CG-Developer

# Get branch parameter
while getopts b: option
do
    case "${option}"
        in
            b) BRANCH=${OPTARG};;
        esac
done
# Push to branch
git push origin $BRANCH
# Execute webhook
node webhook.js




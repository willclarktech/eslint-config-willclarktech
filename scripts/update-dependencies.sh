#!/bin/bash
set -o errexit -o nounset -o pipefail
# command -v shellcheck >/dev/null && shellcheck "$0"

update_deps() {
	local dep_type=$1
	local install_flag=$2
	echo "Updating $dep_type..."

	deps=$(jq -r ".$dep_type | keys | map(. + \"@latest\") | join(\" \")" package.json)

	if [ -n "$deps" ]; then
		# shellcheck disable=SC2086
		npm install "$install_flag" $deps --force
		echo "All $dep_type have been updated to their latest versions."
	else
		echo "No $dep_type found to update."
	fi
	echo
}

update_deps "dependencies" "--save"
update_deps "devDependencies" "--save-dev"
update_deps "peerDependencies" "--save-peer"

echo "All dependencies have been updated to their latest versions."

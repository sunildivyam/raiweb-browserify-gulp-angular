'use strict';
/*
*	metaInformationService Service
*	Description
* 	metaInformationService Service Privides Meta keywords and
*	Meta Description to the pages of the Application
*/
(function() {
	var metaInformationService = function() {
		var metaKeywords = '';
		var metaDescription = '';

		/*
		*	getMetaKeywords() method returns the Meta Keywords
		*/

		function getMetaKeywords() {
			return metaKeywords;
		}

		/*
		*	getMetaDescription() method returns the Meta Description
		*/

		function getMetaDescription() {
			return metaDescription;
		}

		/*
		*	appendMetaKeywords() method appends the keywords to metaKeyWords
		*	keyword param can be string or array of strings.
		*	any other type of value, resets the metaKeywords
		*/

		function appendMetaKeywords(keywords) {
			var lastSeparator = '';
			if (metaKeywords !== '') {
				lastSeparator = ',';
			}

			if (typeof keywords === 'string') {
				metaKeywords += lastSeparator + keywords;
			} else if(keywords instanceof Array) {
				metaKeywords += lastSeparator + keywords.join(',');
			} else {
				metaKeywords = '';
			}
		}

		/*
		*	setMetaDescription() method sets the metaDescription
		*	description param can be string only, anyother type, resets metaDescription
		*/

		function setMetaDescription(description) {
			if (typeof description === 'string') {
				metaDescription = description;
			} else {
				metaDescription = '';
			}
		}

		/*
		*	resetMetaKeywords() method Resets the metaKeyWords
		*/

		function resetMetaKeywords() {
			metaKeywords = '';
		}

		/*
		*	resetMetaDescription() method Resets the metaDescription
		*/

		function resetMetaDescription() {
			metaDescription = '';
		}

		/*
		*	reset() method Resets the metaKeyWords and metaDescription
		*/

		function reset() {
			metaKeywords = '';
			metaDescription = '';
		}

		return {
			getMetaKeywords: getMetaKeywords,
			getMetaDescription: getMetaDescription,
			appendMetaKeywords: appendMetaKeywords,
			setMetaDescription: setMetaDescription,
			resetMetaKeywords: resetMetaKeywords,
			resetMetaDescription: resetMetaDescription,
			reset: reset
		};
	};

	module.exports = metaInformationService;
})();

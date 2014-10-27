(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['debug'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div>\n	<p> "
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + " </p>\n	<p> "
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + " </p>\n</div>";
},"useData":true});
templates['player'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});
templates['queue'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>\n<p> placer holder </p>\n</div>";
  },"useData":true});
templates['search_result'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li class=\"list-group-item\" style=\"padding: 10px\" data-id=\"5430d257c50abd00006a596c\">\n<div class=\"media\">\n<span class=\"pull-left\">\n    <img class=\"media-object\" src=\"http://i.ytimg.com/vi/o-1XuiQpprA/0.jpg\" height=\"50\" width=\"67\" alt=\"thumbnail\" />\n  </span>\n  <div class=\"media-body\">\n    <h4 class=\"media-heading\">A Sky Full of Stars - Coldplay</h4>   \n    <span class=\"date\">1230409 views - 3:43</span>\n    <div class=\"btn-group btn-group-xs right\" style=\"margin-top: -20px\">\n        <button type=\"button\" class=\"btn btn-danger add-button\">+</button>\n    </div>\n  </div>\n</div>\n</li>\n\n";
  },"useData":true});
})();

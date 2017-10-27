<span style="font-size:2.5em">&hellip;</span>
<ul>
    <% loop $RootTabs %>
        <li class="meatball-menu__item meatball-menu__item--details <% if $Last %>meatball-menu__item--divider-after<% end_if %>">
            <a href="$Link">$Title</a>
        </li>
    <% end_loop %>
    <% if $Versioned %>
        <%-- it is important to note that Published and Draft are NOT mutually exclusive --%>
        <% if $Draft %><li><a href="$Link/publish" class="meatball-menu__item meatball-menu__item--action">Publish</a></li><% end_if %>
        <% if $Published %><li><a href="$Link/unpublish" class="meatball-menu__item meatball-menu__item--action">Unpublish</a></li><% end_if %>
        <li><a href="$Link/archive" class="meatball-menu__item meatball-menu__item--action">Delete</a></li>
    <% end_if %>
</ul>

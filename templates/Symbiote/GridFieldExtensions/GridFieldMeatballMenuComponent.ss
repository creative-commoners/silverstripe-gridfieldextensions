<div class="meatball-menu__container">
    <span class="meatball-menu__handle font-icon-dot-3"></span>
    <ul class="meatball-menu__item-list meatball-menu__item-list--right">
        <% loop $RootTabs %>
            <li class="meatball-menu__item meatball-menu__item--details <% if $Last %>meatball-menu__item--divider-after<% end_if %>">
                <a href="$Link">$Title</a>
            </li>
        <% end_loop %>
        <% if $Versioned %>
            <%-- it is important to note that Published and Draft are NOT mutually exclusive --%>
            <% if $Draft %><li class="meatball-menu__item meatball-menu__item--action"><a href="$Link/publish">Publish</a></li><% end_if %>
            <% if $Published %><li class="meatball-menu__item meatball-menu__item--action"><a href="$Link/unpublish">Unpublish</a></li><% end_if %>
            <li class="meatball-menu__item meatball-menu__item--action meatball-menu__item--divider-after"><a href="$Link/archive">Delete</a></li>
        <% end_if %>
    </ul>
</div>

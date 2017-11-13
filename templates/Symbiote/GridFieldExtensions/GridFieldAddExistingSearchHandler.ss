$SearchForm

<h3><%t Symbiote\\GridFieldExtensions\\GridFieldAddExistingSearchButton.RESULTS "Results" %></h3>
<div class="add-existing-search-results">
	<% if $Items %>
		<ul class="add-existing-search-items" data-add-link="$Link('add')">
			<% loop $Items %>
				<li class="$EvenOdd"><a href="#" data-id="$ID">$Title</a></li>
			<% end_loop %>
		</ul>
	<% else %>
		<p><%t Symbiote\\GridFieldExtensions\\GridFieldAddExistingSearchButton.NOITEMS "There are no items." %></p>
	<% end_if %>

	<% if $Items.MoreThanOnePage %>
		<ul class="add-existing-search-pagination pagination">
			<% if $Items.NotFirstPage %>
				<li class="page-item page-item--icon">
                    <a href="$Items.PrevLink" class="page-link">
                        <span class="font-icon-angle-left" aria-hidden="true"></span>
                        <span class="sr-only"><%t Symbiote\\GridFieldExtensions\\GridFieldAddExistingSearchButton.PreviousPage "Previous page" %></span>
                    </a>
                </li>
			<% end_if %>

			<% loop $Items.PaginationSummary(4) %>
				<% if $CurrentBool %>
					<li class="page-item current disabled"><span class="page-link">$PageNum</span></li>
				<% else_if $Link %>
					<li class="page-item"><a href="$Link" class="page-link">$PageNum</a></li>
				<% else %>
					<li class="page-item disabled"><span class="page-link">&hellip;</span></li>
				<% end_if %>
			<% end_loop %>

			<% if $Items.NotLastPage %>
				<li class="page-item page-item--icon">
                    <a href="$Items.NextLink" class="page-link">
                        <span class="font-icon-angle-right" aria-hidden="true"></span>
                        <span class="sr-only"><%t Symbiote\\GridFieldExtensions\\GridFieldAddExistingSearchButton.NextPage "Next page" %></span>
                    </a>
                </li>
			<% end_if %>
		</ul>
	<% end_if %>
</div>

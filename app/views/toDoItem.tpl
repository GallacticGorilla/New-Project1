<div class="todo 
<% if (completed){ %> completed <% } %>">
  <div class="col-sm-1"><%- id%></div>
  <div class="col-sm-7 todo-title"><%- title %></div>
  <div class="col-sm-7 todo-title-edit hidden">
    <input type="text" value="<%- title %>"/>
  </div>
  <div class="col-sm-1">
    <% if(completed){ %>
      <input type="checkbox" checked>
    <% } else{ %>
      <input type="checkbox"> 
    <% } %>
  </div>
   <div class="col-sm-2"><button class="btn btn-default edit">EDIT</button>
   <button class="btn btn-primary save hidden">SAVE</button>
  </div>
  <div class="col-sm-1"> 
    <button type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>    
  </div> 
</div>  

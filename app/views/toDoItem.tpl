<div class="todo">
  <div class="col-sm-1">{{id}}</div>
  <div class="col-sm-7">{{ title }}</div>
  <div class="col-sm-1">
    {{#if completed}}
      <input type="checkbox" checked>
    {{else}}
      <input type="checkbox"> 
    {{/if}}
  </div>
   <div class="col-sm-2"><button class="btn btn-default">EDIT</button></div>
      <div class="col-sm-1"> 
      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>    
    </div> 
</div>  

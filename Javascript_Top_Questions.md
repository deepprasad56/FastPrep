<h1>Javascript Top Questions</h1>

<ul>

  <li><h1><a href='https://medium.com/@AlexanderObregon/event-delegation-in-javascript-explained-1cc2ee7bd1cc'>What is Event Delegation: </a></h1></li>

 <p> 
   
 Every event in browser follows three phase journey:
  <p> Capturing phase - From root element event travels to the element which interacted .</p>
  <p> Target Phase -When event arrives at the element which triggered the event</p>
  <p> Bubbling Phase- After reaching the target , the event travels backup the dom tree .</p>

   <b>TopDown-Target-BottomUp is the final flow of the events</b>
   <p>Default- We deal with Bubbling Phase </p>

   <h4>So what is Event Delegation?</h4>
   <p>Event Delegation is way of attaching event to every similar
   element , we can directly add event to the parent element and call and handler on basis of the target element which triggered that event so that events are handled efficiently </p>
 </p>

  
</ul>

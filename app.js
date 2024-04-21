const ujjwalSelectorBtn=document.querySelector("#Ujjwal");
const kiranSelectorBtn=document.querySelector("#kiran");
const chatHeader=document.querySelector(".chat-header");
const chatMessages=document.querySelector(".chat-messages");
const chatInputForm=document.querySelector(".chat-input-form");
const chatInput=document.querySelector(".chat-input");
const clearChatBtn=document.querySelector(".clear-chat-button");
const sendMesage=document.querySelector(".button");




      // change the person name according to the sender and reciver

      const message= JSON.parse(localStorage.getItem('messages')) || [];
const createChatMessageElement=(messages)=>`
<div class="messages ${messages.sender=='Ujjwal' ? 'blue-bg':'gray-bg'}">          
                <div class="messages-sender">${messages.sender}</div>
                <div class="messages-text">${messages.text}</div>
                <div class="messages-timestamp">${messages.timestamp}</div>
                </div>
` 
window.onload=()=>{
    message.forEach((messages)=> {
  chatMessages.innerHTML +=createChatMessageElement(messages)
    });
}

// Make sure to prompt the user before leaving the page
window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  event.returnValue = "Do you relly want to leave the page?";
});

  
 let messagesender='Ujjwal';


 /// UpdateMessage function to update the name while sending the message
 const updateMessagesSender=(name)=>{

messagesender=name;
chatHeader.innerText=`${messagesender} chatting.......`
chatInput.placeholder=`Type here ${messagesender}`
 //not working this part..
   if (name==='Ujjwal') {
    ujjwalSelectorBtn.classList.add('active-person');
    ujjwalSelectorBtn.classList.remove('active-person');
 }
 else if (name==='kiran') {
    kiranSelectorBtn.classList.add('active-person');
    kiranSelectorBtn.classList.remove('active-person');
 }
 //upto this only not change the active-person
 chatInput.focus();
 
}


           // for change the chatting page when ever click the name of person

  ujjwalSelectorBtn.onclick=()=>updateMessagesSender('Ujjwal')
  kiranSelectorBtn.onclick=()=>updateMessagesSender('Kiran')
  

 const sendMessages =(e)=>{
    e.preventDefault()
    
  

    const timestamp=new Date().toLocaleString('en-US',{hour:'numeric',minute:"numeric",hour12:true})
    const newMessages={
        sender:messagesender,
        text:chatInput.value,
     timestamp,
  
  };
  //push the newmessage in the createchatMessage Element fucation
  // the push add the in last part of array 
  message.push(newMessages)
  localStorage.setItem('messages',JSON.stringify(message));
  chatMessages.innerHTML += createChatMessageElement(newMessages);
  chatInputForm.reset();
  //not workikng // scrolling the chat
   setTimeout (()=>{chatMessages.scrollTop=chatMessages.scrollHeight;
   },0);
 }
  chatInputForm.addEventListener('submit',sendMessages)
   
  clearChatBtn.addEventListener('click',()=>{
    localStorage.clear()
    chatMessages.innerHTML='';
  })
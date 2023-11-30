const generate_button = document.getElementById("generate_button");
const pic_selector = document.getElementById("pick_selector");


const result_wrapper = document.getElementById("result_wrapper");
const required_input_form_wrapper = document.getElementById("required_input_form_wrapper");

//       navigator.clipboard.writeText(copyText.value);
{
  /* <div>con</div>; */
}
const genrate = {
  route_controller_create_generate: {
    required_data_form_generate:()=>{
const wrapper=document.createElement('div');
const route_name=document.createElement('input');
const controller_name=document.createElement('input');
const service_name=document.createElement('input');
const display_note=document.createElement('p');

display_note.innerText=`note- 
                              1. route name is required
                              2. if controller name is not given, it will user route name
                              3. if service name is not given, it will user controller name
                              4. you can edit the generated code
`

route_name.type="text"
controller_name.type="text"
service_name.type="text"

route_name.placeholder="route";
controller_name.placeholder="controller";
service_name.placeholder="service";

route_name.id="generated_input_for_route";
controller_name.id="generated_input_for_controller";
service_name.id="generated_input_for_service";

wrapper.appendChild(route_name);
wrapper.appendChild(controller_name);
wrapper.appendChild(service_name);
wrapper.appendChild(display_note);





return {
    form_template:wrapper.outerHTML,
    input_data:{
    route:route_name,
    controller:controller_name,
    service:service_name,
  }
  
}
    },
    html_template_generate: (...args) => {
      const wrapper_main = document.createElement("div");
      wrapper_main.className="generated_wrapper_main";

      args.map((a) => {
        const wrapper = document.createElement("div");
        wrapper.className="generated_wrapper";
        const code = document.createElement("div");
        code.contentEditable=true
        code.className="generated_code_wrapper";

        const button_wrapper = document.createElement("div");
        button_wrapper.className="generated_button_wrapper";

        const code_copy_button = document.createElement("button");
        code_copy_button.addEventListener("click",()=>{
              navigator.clipboard.writeText(code.innerText);
        })
        code_copy_button.className="generated_code_copy_button";
        code.innerText = a;
        code_copy_button.innerText = "copy";




wrapper.append(code);
        wrapper.append(button_wrapper);
        button_wrapper.append(code_copy_button);
        wrapper_main.appendChild(wrapper);
      });
      return wrapper_main;
    },
    code_generate: (route_name, controller_name, service_name, function_name) => {
      if (route_name == undefined) {
        return "please provide route name";
      }
      if(controller_name==undefined || controller_name==""){
        controller_name =route_name
      }
      if(service_name==undefined|| service_name==""){
        service_name =controller_name||route_name
      }

      const route = `_app.post('/api/user/${route_name}', controllers.user.${controller_name}); `;
      const controller = `
     exports.${controller_name}=function (req,res){
           
         ServiceFile.${service_name}(req,res)
         .on(EventName.ERROR, _err => {
             log.debug(_err);
             res.sendErrorAPIResponse(_err);
         })
         .on(EventName.DONE, status => {
             res.sendSuccessAPIResponse({status});
         });
     }.securedAPI();
     `;
      const service = `exports.${service_name} = function (req) {
         var emitter = this


         var tasks = []

         tasks.push(function (cb) {
             PromiseQuery()
             .then(resposne => {
             //code
               cb()
             })
             .catch((error) => {
               //code
               cb(error);
             })
         })

         async.series(tasks, function (_err) {
           if (_err) {
             emitter.emit(EventName.ERROR, _err)
           } else {
             emitter.emit(EventName.DONE, {
               statusCode: 200,
               message: "sucessfull",
             })
           }
         })
       }.toEmitter()`;
      return {
        route,
        controller,
        service,
      };
    },
  },
};


window.addEventListener("load",()=>{
  required_input_form_wrapper.innerHTML="";
  const pic_selector_value=pic_selector.value

  if(genrate[pic_selector_value]==undefined){
    alert("sorry, this generate option is not aviliable ");
    return;
  }

  const generated_input_form=genrate[pic_selector_value].required_data_form_generate().form_template;
  required_input_form_wrapper.innerHTML=generated_input_form
  const generated_input_form_data=genrate[pic_selector_value].required_data_form_generate().input_data;

  // console.log(
  //   generated_input_form_data,
  //     generated_input_form_data.route.value,
  //     generated_input_form_data.controller.value,
  //     generated_input_form_data.service.value
    
  // );
})


pic_selector.addEventListener("input",()=>{
  required_input_form_wrapper.innerHTML="";
  const pic_selector_value=pic_selector.value

  if(genrate[pic_selector_value]==undefined){
    alert("sorry, this generate option is not aviliable ");
    return;
  }

  const generated_input_form=genrate[pic_selector_value].required_data_form_generate().form_template;
  required_input_form_wrapper.innerHTML=generated_input_form
  console.log(generated_input_form)
  const generated_input_form_data=genrate[pic_selector_value].required_data_form_generate().input_data;

  console.log(
    generated_input_form_data,
    // genrate[pic_selector_value].html_template_generate(
      generated_input_form_data.route.value,
      generated_input_form_data.controller.value,
      generated_input_form_data.service.value
    
  );
})




generate_button.addEventListener("click", () => {
  const pic_selector_value=pic_selector.value
console.log(genrate[pic_selector_value])
if(genrate[pic_selector_value]==undefined){
  alert("sorry, this generate option is not aviliable ");
  return;
}

//show required input form
const generated_input_for_route=document.getElementById("generated_input_for_route").value 
const generated_input_for_controller=document.getElementById("generated_input_for_controller").value
const generated_input_for_service= document.getElementById("generated_input_for_service").value
 
if(generated_input_for_route=="" || undefined){
  alert("please fill route name")
  return;
}


// it gives generated code
  const generated_code_obj= genrate[pic_selector_value].code_generate(
    generated_input_for_route,
    generated_input_for_controller,
    generated_input_for_service
  )
  console.log(generated_code_obj)

  // it integrate the code in to html to display user
  result_wrapper.innerHTML="";
  result_wrapper.appendChild(genrate[pic_selector_value].html_template_generate(
    generated_code_obj.route,
    generated_code_obj.controller,
    generated_code_obj.service
  ))


});

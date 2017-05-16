/**
 * Created by chris.baldock on 13/5/17.
 */
({
    validateInput : function(component, event){
        //N.B. below works in all cases except when invoked OnInit
        var inputComponent = component.find("textInput");
        var inputValue = inputComponent.getElement().value;

        //N.B. doesn't work - returns undefined
        //var inputComponent = component.find("textInput");
        //var inputValue = inputComponent.get("v.value");

        //N.B. below works only when triggered by the event
        //var inputValue = event.currentTarget.value;

        var isRequired = component.get("v.isRequired");

        //component
        if(!inputValue && isRequired){
            component.set("v.isValid", false);
        }
        else{
            component.set("v.isValid", true);
            component.set("v.showError", false);
        }

    },
    fireValueChangeEvent : function(component, event) {
        var driverKey = component.get("v.driverKey");
        var objectKey = component.get("v.objectKey");
        var fieldKey = component.get("v.fieldKey");
        var isValid = component.get("v.isValid");

        var inputComponent = component.find("textInput");;
        var inputValue = inputComponent.getElement().value;

        //N.B. doesn't work - returns undefined
        //var inputComponent = component.find("textInput");
        //var inputValue = inputComponent.get("v.value");

        //N.B. below works only when triggered by the event
        //var inputValue = event.currentTarget.value;

        var appEvent = $A.get("e.c:FF_EventValueChange");

        appEvent.setParams({
            "driverKey" : driverKey,
            "objectKey" : objectKey,
            "fieldKey" : fieldKey,
            "value" : inputValue,
            "inputIsValid" : isValid
        });

        appEvent.fire();
    },
    showError : function(component, event){
        var driverKey = event.getParam("driverKey");

        //only handle value change if matching driverKey
        if(driverKey == component.get("v.driverKey")){
            component.set("v.showError", true);
        }
    },
    registerSelf : function(component, event){
        var eventParams = event.getParams();
        var driverKey = eventParams.driverKey;

        //only handle value change if matching driverKey
        if(driverKey == component.get("v.driverKey")){
            //invoke callback function
            eventParams.callback(component);
        }
    }
})
/**
 * Created by chris.baldock on 13/5/17.
 */
({
    initFormState: function(component, event){
        var formState = {};
        formState.driverKey = component.get("v.driverKey");
        formState.formIsValid = component.get("v.formIsValid");
        formState.recordId = component.get("v.recordId");
        formState.objects = {};
        component.set("v.formState", formState);
        component.set("v.formStatePrettyPrint", JSON.stringify(formState, null, 2));
    },

    updateFormState: function(component, objectKey, fieldKey, value, isValid){
        var formState = component.get("v.formState");

        //objectKey has not yet been added to form state
        if(!formState.objects[objectKey]){
            var newField = {};
            newField[fieldKey] = {};
            newField[fieldKey].value = value;
            newField[fieldKey].isValid = isValid;
            formState.objects[objectKey] = newField;
        }
        //Object has already been added to form state so add/update value
        else{
            //fieldKey has not yet been added to form state
            if(!formState.objects[objectKey][fieldKey]){
                formState.objects[objectKey][fieldKey] = {};
                formState.objects[objectKey][fieldKey].value = value;
                formState.objects[objectKey][fieldKey].isValid = isValid;
            }
            else{
                formState.objects[objectKey][fieldKey].value = value;
                formState.objects[objectKey][fieldKey].isValid = isValid;
            }
        }

        //No need to validate entire form if new input is not valid
        if(!isValid){
            component.set("v.formIsValid", false);
        }
        else{
            this.validateForm(component, event);
        }

        formState.formIsValid = component.get("v.formIsValid");
        component.set("v.formState", formState);
        component.set("v.formStatePrettyPrint", JSON.stringify(formState, null, 2));
    },
    //fire application event to register all form elements with same driverKey
    registerFormElements: function(component, event){
        var driverKey = component.get("v.driverKey");

        var appEvent = $A.get("e.c:FF_EventRegisterFormElements");

        //N.B. cannot use this within a nested method. Resolve by assigning to a global variable
        var helperRef = this;

        appEvent.setParams({
            "driverKey": driverKey,
            "callback": function(childComponent){
                var objectKey = childComponent.get("v.objectKey");
                var fieldKey = childComponent.get("v.fieldKey");
                var value = childComponent.get("v.value");
                var inputIsValid = childComponent.get("v.isValid");
                helperRef.updateFormState(component, objectKey, fieldKey, value, inputIsValid);
            }
        });

        appEvent.fire();
    },

    handleValueChange: function(component, event){
        var driverKey = event.getParam("driverKey");
        var objectKey = event.getParam("objectKey");
        var fieldKey = event.getParam("fieldKey");
        var value = event.getParam("value");
        var inputIsValid = event.getParam("inputIsValid");

        //only handle value change if matching driverKey
        if(driverKey == component.get("v.driverKey")){
            this.updateFormState(component, objectKey, fieldKey, value, inputIsValid);
        }
    },

    broadcastShowError: function(component, event){
        var driverKey = component.get("v.driverKey");

        var appEvent = $A.get("e.c:FF_EventShowError");

        appEvent.setParams({
            "driverKey": driverKey
        });

        appEvent.fire();
    },

    //form is only valid if all field elements have isValid == true
    validateForm: function(component, event){
        var formState = component.get("v.formState");
        var formObjects = formState.objects;
        var formIsValid = true;

        //for each object
        for(var objKey in formObjects){
            //for each field in each object
            for(var fldKey in formObjects[objKey]){
                //if any field is not valid then set form to not valid
                if(!formObjects[objKey][fldKey].isValid){
                    formIsValid = false;
                }
            }
        }

        component.set("v.formIsValid", formIsValid);
    },

    submitForm: function(component, event){
        //to be implemented
    }
})
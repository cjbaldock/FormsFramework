/**
 * Created by chris.baldock on 13/5/17.
 */
({
    onInit : function(component, event, helper){
        helper.initFormState(component, event);
        helper.registerFormElements(component, event);
    },
    handleValueChangeEvent: function(component, event, helper){
        helper.handleValueChange(component, event);
    },
    submitForm : function(component, event, helper){
        var formIsValid = component.get("v.formIsValid");
        //only submit form if form is valid
        if(formIsValid){
            helper.submitForm(component, event);
        }
        //else broadcast showError event to all linked components
        else{
            helper.broadcastShowError(component, event);
        }
    }
})
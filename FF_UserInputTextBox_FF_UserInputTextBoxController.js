/**
 * Created by chris.baldock on 13/5/17.
 */
({
    onInit : function(component, event, helper){
        //helper.validateInput(component, event);
    },
    valueChangeEvent : function(component, event, helper){
        helper.validateInput(component, event);
        helper.fireValueChangeEvent(component, event);
    },
    showError : function(component, event, helper){
        helper.showError(component, event);
    },
    registerSelf : function(component, event, helper){
        //helper.validateInput(component, event);
        helper.registerSelf(component, event);
    }
})
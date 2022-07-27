import { useEffect, useState } from 'react';
import { addListener, getItem, removeListener, setItem } from '../stores/Local';

export type LanguageID = "en_US" | "en_CA" | "es_US" | "fr_CA" | "jp_JP"

export const getLanguages = (): LanguageID[] => {
    return ["en_US", "es_US"];
}

export const setLanguage = (lang: LanguageID) => {
    setItem("language", lang);
}

export const getLanguageDataNoCache = (lang: LanguageID): Language => {
    switch (lang) {
        case "en_US": return require("../../content/messages.en_US");
        case "en_CA": return require("../../content/messages.en_CA");
        case "es_US": return require("../../content/messages.es_US");
        case "fr_CA": return require("../../content/messages.fr_CA");
        case "jp_JP": return require("../../content/messages.jp_JP");
    }
}

let langaugeCache = {}

export const getLanguageData = (lang: LanguageID): Language => {
    if (!langaugeCache[lang]) {
        langaugeCache[lang] = getLanguageDataNoCache(lang);
    }
    return langaugeCache[lang];
}

addListener("language", (lang) => setItem("languageData", getLanguageData(lang)));

export const useLanguage = () => {
    const [get, set] = useState(getItem("languageData"));
    useEffect(() => {
        const id = addListener("languageData", (value) => set(value));
        return () => removeListener(id)
    });
    return get;
}

export interface Language {
    modernizationNew: {
        contactPhone: string
    },
    common: {
        next: string
        submit: string
        continue: string
        cancel: string
        close: string
        update: string
        back: string
        skip: string
        stop: string
        retry: string
        save: string
        edit: string
        saveSend: string
        delete: string
        deleteAll: string
        yes: string
        no: string
        vin: string
        notification: string
        password: string
        confirmPassword: string
        currentPassword: string
        contactInformation: string
        firstName: string
        lastName: string
        email: string
        push: string
        emailAddress: string
        confirmEmailAddress: string
        confirmEmail: string
        streetAddress: string
        streetAddress2: string
        city: string
        state: string
        zip: string
        username: string
        subaruStarlinkRemoteServices: string
        starlinkRemoteServices: string
        scheduleService: string
        boundaryAlerts: string
        curfewAlerts: string
        speedAlerts: string
        maintenanceSchedule: string
        success: string
        failure: string
        error: string
        failed: string
        systemFailed: string
        provider: string
        date: string
        mileage: string
        notes: string
        exportToExcel: string
        print: string
        completed: string
        deleteSettingMessage: string
        findRetailer: string
        selectState: string
        remove: string
        ok: string
        learnMore: string
        starlinkSafetyPlus: string
        starlinkSecurityPlus: string
        starlinkConcierge: string
        starlinkSafetyAndSecurity: string
        starlinkSafetyAndSecurityPHEV: string
        starlinkSafetySecurityAndConcierge: string
        off: string
        on: string
        loadingVehicle: string
        alert: string
        confirm: string
        myRetailer: string
        service: string
        serviceAndMaintenance: string
        sales: string
        parts: string
        select: string
        sun: string
        mon: string
        tue: string
        wed: string
        thu: string
        fri: string
        sat: string
        call: string
        scheduleAppointment: string
        shopPartsAccessories: string
        recordAService: string
        selectRetailer: string
        callService: string
        expiration: string
        confirmation: string
        mobilePhoneNumber: string
        phone: string
        mobilePhone: string
        viewTutorial: string
        deleteAlert: string
        editAlert: string
        sendToVehicle: string
        deactivateAlert: string
        trackDispatch: string
        pleaseSelectAState: string
        callSales: string
        retailerWebsite: string
        getDirections: string
        findRetailerWithBreak: string
        recordAServiceWithBreak: string
        myStarlinkAccount: string
        manageStarlinkSubscription: string
        communicationPreferences: string
        starlinkCommunicationPreferences: string
        starlinkNotifications: string
        termsAndConditions: string
        profile: string
        text: string
        automatedPhoneCall: string
        remoteEngineStart: string
        recalls: string
        subaruHawaii: string
        myFirstSubaru: string
        exitDemoMode: string
        MySubaru: string
        demoCar: string
        info: string
        updateAvailable: string
        unavailable: string
        apply: string
        subscribeNow: string
        attention: string
        alreadyUsedNumber: string
        defaultEmailText: string
        pleaseSelect: string
        phoneType: string
        fingerID: string
        faceID: string
        fingerprintScanner: string
        faceUnlock: string
        androidBiometrics: string
        sendRetailerPOI: string
        selectYourVehicle: string
        or: string
        searchOtherVehicles: string
        toggle: string
        set: string
        support: string
        seeDetails: string
        details: string
        findADifferentRetailer: string
        retailerDetails: string
        addToTrip: string
        getDirectionsLink: string
        at: string
        verificationAccessLabel: string
        mph: string
        active: string
        inactive: string
    },
    passwordRules: {
        passwordRule: string
        charatersLength: string
        uppercaseCharacters: string
        lowercaseCharacters: string
        numberRules: string
        noSpacesAllowed: string
        specialCharacterRules: string
        notExistingPassword: string
    },
    accountCheckPanel: {
        title: string
        enterYourVin: string
        pageDescription: string
    },
    accountCheckSuccessPanel: {
        title: string
        emailSent: string
        pageDescription: string
    },
    accountCheckFailPanel: {
        title: string
        pageDescription: string
    },
    addHistory: {
        addServiceEntry: string
        serviceProvider: string
        serviceProviderName: string
        mileageInterval: string
        dateOfService: string
        selectDate: string
    },
    addVehicle: {
        myVehicles: string
        addVehicle: string
        vin: string
        enterVin: string
        vehicleNickname: string
        enterNickname: string
        vehicleLicensePlate: string
        enterPlate: string
        stateRegistration: string
        selectState: string
        addVehicleFormValidateMessages: {
            vin: {
                required: string
                remote: string
                minlength: string
                maxlength: string
            },
            nickname: {
                required: string
            },
            licensePlate: {
                required: string
            },
            licensePlateState: {
                required: string
            }
        },
        vehicleAdded: string
        unableCompleteRequest: string
        vehicleRegistered: string
        ownerVerificationNotAvailable: string
        errorValidatingVin: string
        errorInvalidTSP: string
        needMoreInfo: string
    },
    assignAsRetailer: {
        authorizedRetailer: string
        callSales: string
        makeRetailer: string
    },
    attWifiHotspot: {
        title: string
        pageDescription: string
        callNow: string
        callNumber: string
        hoursOfOperation: string
        mondayThursday: string
        saturdaySunday: string
        currentMileage: string
        estimatedMileage: string
        agreementDescription: string
        agreementExpirationDate: string
    },
    authorizeDevicePanel: {
        authorizeDevice: string
        securityQuestion: string
        securityQuestionHere: string
        tryDifferentQuestion: string
        noSecurityQuestions: string
    },
    authorizedUserEdit: {
        invalidMarket: string
        AUTH_USER_EMAIL_SHOULD_NOT_SAME_AS_PRIMARY: string
        EXISTING_INACTIVE_AUTH_USER_ACCOUNT: string
        authUserEdit: string
        emailAddress: string
        confirmEmailAddress: string
        mobilePhone: string
        streetAddress1: string
        zip: string
        accessLevel: string
        level1Access: string
        level1Description: string
        level2Access: string
        level2Description: string
        addContacts: string
        relationship: string
        setContacts: string
        emailExists: string
        alreadyAuthorized: string
        errorCreateAuthUser: string
        errorSamePrimaryCustId: string
        errorSaveAuthUser: string
        errorUpdateAuthUser: string
        errorCreateEmergencyContact: string
        numberExistsEmergencyContact: string
        maxEmergencyContact: string
        activeSubscription: string
        rightToRepairSelectState: string
    },
    authorizeUserLanding: {
        authorizedUsers: string
        pageDescription: string
        addUser: string
        deleteContact: string
        editContact: string
        reachedMaxNumber: string
    },
    authorizeUserReview: {
        deleteUser: string
        editUser: string
        addUser: string
        saveUser: string
        nameUser: string
    },
    authorizedUsers: {
        addUser: string
        editUser: string
        unableFetchUser: string
        errorFetchingContact: string
        saveUser: string
        userSaved: string
        userError: string
        failure: string
        incorrectPassword: string
        crmRightToRepairHeader: string
        crmRightToRepairContent: string
        authorizedUserFormValidateMessages: {
            firstName: {
                required: string
            },
            lastName: {
                required: string
            },
            gender: {
                required: string
            },
            email: {
                email: string
                required: string
                notEqualToPrimaryUserEmail: string
            },
            emailConfirm: {
                equalTo: string
            },
            phone: {
                minlength: string
                maxlength: string
                required: string
            },
            city: {
                required: string
            },
            state: {
                required: string
            },
            postalCode: {
                required: string
            },
            streetAddress1: {
                required: string
                alphanumericSpaceAddress: string
            },
            streetAddress2: {
                alphanumericSpaceAddress: string
            },
            emergencyContactRelationShip: {
                required: string
            }
        },
        wantDelete: string
        deletedSuccessfully: string
        errorDeleting: string
        errorFetchingInformation: string
    },
    billingInformation: {
        title: string
        paymentInformation: string
        creditCard: string
        cardNotValidated: string
        cardNumber: string
        cvv: string
        expirationMonth: string
        pleaseSelect: string
        expirationYear: string
        cardBeCharged: string
        sameHomeAddress: string
        addressLine1: string
        addressLine2: string
        edit: string
        billingNotification: string
        billingNotificationText: string
    },
    bluetoothCompatibility: {
        notAvailableForThisModel: string
        notApply3rdParty: string
        requiredHeadUnit: string
        requiredServiceProvider: string
        requiredManufacturer: string
        requiredPhoneModel: string
        requiredModelName: string
        requiredTrim: string
        selectYourPhone: string
        vehicleHeadUnitNotBluetoothCompatible: string
        year: string
        model: string
        trim: string
        headUnit: string
        carrier: string
        manufacturer: string
        phone: string
        checkCompatibility: string
        goToYourSettingsArea: string
        sliderTurnedOn: string
        tapHomeThenPhone: string
        pairPhoneYes: string
        pressAddOnStarlink: string
        selectPairToConfirm: string
        transferPhonebookToSubaru: string
        confirmPairing: string
        checkAnotherDevice: string
        checkYourPhoneCompatibility: string
        bluetoothFeatures: string
        viewPairingInstructions: string
    },
    changePassword: {
        title: string
        newPassword: string
        confirmNewPassword: string
        changePasswordFormValidateMessages: {
            oldPassword: string
            password: {
                required: string
                minlength: string
                notEqualTo: string
                maxlength: string
            },
            passwordConfirmation: {
                equalTo: string
            }
        },
        passwordChanged: string
        incorrectOldPassword: string
        unableUpdate: string
    },
    changePin: {
        title: string
        currentPin: string
        newPin: string
        confirmNewPin: string
        changePinFormValidateMessages: {
            oldPin: {
                required: string
                minlength: string
            },
            pin: {
                required: string
                minlength: string
                notEqualTo: string
            },
            pinConfirmation: {
                equalTo: string
            }
        },
        PinChanged: string
        incorrectOldPin: string
        unableUpdate: string
        resetPinFormValidateMessages: {
            password: string
            pin: {
                required: string
                minlength: string
            },
            pinConfirmation: {
                equalTo: string
                required: string
            }
        },
        incorrectPassword: string
        passwordRequired: string
        enterPasswordPanelFormValidateMessages: {
            password: string
        },
        remoteServicePinPanelFormValidateMessages: {
            remoteServicePin: {
                required: string
                minlength: string
                maxlength: string
            },
            remoteServicePinConfirmation: {
                equalTo: string
            }
        },
        pinSet: string
        unableSet: string
        enableTouchIdForPin: string
    },
    chargeReview: {
        chargeNow: string
        estimatedDistance: string
        lastUpdated: string
        vehicleCurrently: string
        chargingTimer: string
        createSchedule: string
        createNewSchedule: string
        reachedMaxNumber: string
        refreshSchedule: string
        schedule: string
        deleteSchedule: string
        editSchedule: string
        starts: string
        batteryStatus: string
        selectToGetUpdatedSchedule: string
        update: string
        estimatedBatteryRange: string
        batteryRange: string
    },
    chargeSchedule: {
        chargingTimer: string
        type: string
        start: string
        departure: string
        startTime: string
        autoClimate: string
        autoClimateDescription: string
        on: string
        off: string
        editTime: string
    },
    changeSecurityQuestion: {
        title: string
        securityQuestions: string
        pageDescription: string
        question: string
        answer: string
        securityQuestion1: string
        selectSecurityQuestion1: string
        securityQuestion2: string
        selectSecurityQuestion2: string
        securityQuestion3: string
        selectSecurityQuestion3: string
        changeSecurityQuestions: string
    },
    chargeSettings: {
        isCharged: string
        isCharging: string
        chargePluggedIn: string
        readyToCharge: string
        isReadyToCharge: string
        cannotSetAutoClimate: string
        invalidSetting: string
        AtLeastOneDay: string
    },
    chooseService: {
        selectService: string
        vehicleHealthServices: string
        recommendedServices: string
        recommendedMaintenanceServices: string
        previouslyDeclinedServices: string
        otherServices: string
        viewMore: string
        viewLess: string
        OpenRecallsServiceCampaigns: string
        nonSchedulableRecallDisclaimer: string
        recallInformation: string
        recallTitle: string
        warningLights: string
    },
    climateControlInfo: {
        climateControl: string
        description: string
        createNew: string
    },
    climateControlSetting: {
        climateControlSettings: string
        climateControlStart: string
        climateControlStop: string
        settingsLocked: string
        temperature: string
        chooseClimateSettings: string
        manual: string
        automatic: string
        runtime: string
        climateControlRuntime: string
        airFlow: string
        face: string
        faceFeet: string
        feet: string
        defrosterFeet: string
        frontDefroster: string
        heatedSeats: string
        driver: string
        passenger: string
        defroster: string
        front: string
        rear: string
        airFlowSpeed: string
        airCirculation: string
        outside: string
        inside: string
        rearAC: string
        reviewContent: string
        pleaseStopControl: string
    },
    coupons: {
        specialOffers: string
        tirePromotions: string
        offerExpires: string
        source: string
        tc: string
        redemption: string
        printRedemptionDescription: string
    },
    curfewsLanding: {
        curfewAlerts: string
        createNewAlert: string
        reachedMaxNumber: string
        createAlertDescription: string
    },
    curfewsSetting: {
        curfewAlerts: string
        applyAll: string
        startTime: string
        endTime_: string
        monday: string
        tuesday: string
        wednesday: string
        thursday: string
        friday: string
        saturday: string
        sunday: string
        timeZone: string
        saveSetting: string
        nameSetting: string
        sendAfterSave: string
        editSetting: string
        saturdayMorning: string
        dismiss: string
        hours: string
        minutes: string
        wantContinue: string
        addAdditionalCurfew: string
        reachedMaxTimes: string
        reachedMaxDays: string
        TurnedOffBy: string
        endAt: string
        curfew: string
        selectedTime: string
        wantDelete: string
        curfewFormValidateMessages: {
            curfewName: {
                required: string
                alphanumericSpace: string
                alphanumericSpaceNoSpaceStart: string
                alphanumericSpaceNoSpaceEnd: string
            },
            timeZoneId: {
                required: string
            }
        },
        nameAlreadyExists: string
        startEndSame1: string
        startEndSame2: string
        startEndSame3: string
        invalidStartEnd: string
        startEndMore1: string
        startEndMore2: string
        invalidTime: string
        schedulesCannotOverlap: string
        selectCurfewTime: string
        pleaseAdjust: string
        curfewCrossingMidnightUTC: string
        curfewCrossingMidnightUTC1: string
        durationTime: string
        learnMore: string
        modalContent: string
        modalContentb: string
        modalAccordionContent: string
    },
    defaultFavorites: {
        homeFavoriteAddress: string
        viewDetails: string
    },
    demo: {
        sending: string
        toVehicle: string
        processing: string
        completed: string
        featureNotInDemo: string
        tirePressureDescription: string
        tirePressure: string
        airbagSystemDescription: string
        airbagSystem: string
        absDescription: string
        abs: string
        openRecallService: string
        oilChangeMaintenance: string
        am: string
        pm: string
        displayFullReport: string
        hideFullReport: string
    },
    driverAlertsGen2: {
        driverAlertsSettings: string
        currentPlan: string
        enrollRenewMessage: string
    },
    emailSub: {
        title: string
        emailSentTo: string
        change: string
        subaruNews: string
        subscribeAllNews: string
        insiderNewsletter: string
        insiderNewsletterDescription: string
        driveMagazine: string
        driveMagazineDescription: string
        performanceMagazine: string
        performanceMagazineDescription: string
        subaruUpdates: string
        subscribeAll: string
        eventsFestivals: string
        eventsFestivalsDescription: string
        subaruGear: string
        subaruGearDescription: string
        specialOffers: string
        specialOffersDescription: string
        vehicleInformation: string
        vehicleInformationDescription: string
        subscribeOpinion: string
        feedback: string
        feedbackDescription: string
        unsubscribe: string
        unsubscribeDescription: string
    },
    emergencyContactsEdit: {
        emergencyContacts: string
        mi: string
        mobile: string
        home: string
        work: string
        setPrimaryContact: string
        numberAlreadyAdded: string
    },
    emergencyContactPrompt: {
        emergencyContact: string
        emergencyContactPromptContent: string
        emergencyContactSuccessSaveMessage: string
        successTitle: string
        successMessage: string
    },
    emergencyContactsLanding: {
        createContactList: string
        addAnContact: string
        deleteContact: string
        editContact: string
        addContact: string
        reachedMaxNumber: string
        wantDelete: string
        contactDeleted: string
        errorFetchingContact: string
        informationSaved: string
        contactInfoFormValidateMessages: {
            firstName: {
                required: string
                maxlength: string
            },
            middleInitial: {
                maxlength: string
            },
            lastName: {
                required: string
                maxlength: string
            },
            relationship: {
                required: string
            },
            phoneEdit: {
                required: string
            }
        }
    },
    enterPasswordPanel: {
        enterPassword: string
    },
    error: {
        generalError: string
        returnHome: string
    },
    events: {
        title: string
        location: string
        addToCalendar: string
        eventWebsite: string
        noEvents: string
        comeBackLater: string
    },
    forgotPinPanel: {
        title: string
        resetMessage: string
        forgotPin: string
    },
    forgotSomethingPanel: {
        howCanWeHelp: string
        forgotUsername: string
        forgotPassword: string
        notSureAccount: string
        NEW_PASSWORD_MATCHES_CURRENT: string
        forgotPasswordFormValidateMessages: {
            email: {
                required: string
                email: string
                maxlength: string
            }
        },
        forgotPasswordVerificationFormValidateMessages: {
            verificationCode: {
                required: string
                maxlength: string
            }
        },
        codeIncorrect: string
        accountLocked: string
        forgotPasswordEnterNewFormValidateMessages: {
            password: {
                required: string
                minlength: string
            },
            passwordConfirmation: {
                required: string
                equalTo: string
            }
        },
        forgotUsernameFormValidateMessages: {
            vin: {
                required: string
                remote: string
                minlength: string
                maxlength: string
            }
        },
        accountCheckFormValidateMessages: {
            vin: {
                required: string
                remote: string
                minlength: string
                maxlength: string
            }
        }
    },
    forgotUsernamePanel: {
        forgotUsername: string
        enterYourVin: string
        enterVinDescription: string
        vinDescription: string
    },
    forgotUsernameSuccessPanel: {
        pageDescription: string
        pageDescription2: string
    },
    forgotUsernameFailPanel: {
        pageDescription: string
    },
    forgotPasswordPanel: {
        forgotPassword: string
    },
    forgotPasswordContactsPanel: {
        pageDescription: string
        contactMethod: string
        termsConditions: string
    },
    forgotPasswordVerificationPanel: {
        pageDescription: string
        pageDescriptionNoBreak: string
        logIn: string
        accessCode: string
    },
    forgotPasswordEnterNewPanel: {
        pageDescription: string
        newPassword: string
        confirmNewPassword: string
    },
    forgotPasswordFailPanel: {
        pageDescription: string
    },
    forgotPasswordSuccessPanel: {
        pageDescription: string
        logIn: string
    },
    geoFencingCreate: {
        chooseBoundaryCenter: string
        sendAlert: string
        exitsArea: string
        entersArea: string
        selectShape: string
        boundaryName: string
        nameSetting: string
        saveSetting: string
        timeUntilAlert: string
        seconds: string
    },
    geoFencingLanding: {
        pageDescription: string
        createNewAlert: string
        reachedMaxNumber: string
        miles: string
        exit: string
        enter: string
        wantDelete: string
        selectToBegin: string
        boundaryNotDefined: string
        boundarySettingsFormValidateMessages: {
            boundaryName: {
                required: string
                alphanumericSpace: string
                alphanumericSpaceNoSpaceStart: string
                alphanumericSpaceNoSpaceEnd: string
            }
        },
        nameAlreadyExists: string
    },
    helpAndSupport: {
        support: string
        supportAndResources: string
        ownerSupportAndResources: string
    },
    home: {
        subaruStarlink: string
        remoteServices: string
        controlVehicle: string
        servicesNotFunction1a: string
        servicesNotFunction1b: string
        servicesNotFunction1aHTML: string
        servicesNotFunction1bHTML: string
        vehicleReportedStolenHeader: string
        vehicleReportedStolen: string
        vehicleReportedStolenAlert: string
        contactCustomerSupport: string
        subscriptionUpgradeText: string
        locateVehicle: string
        lockDoors: string
        unlockDoors: string
        hornLights: string
        safetyPlus: string
        servicesNotFunction2: string
        notSubscribed: string
        startEngine: string
        stopEngine: string
        trips: string
        remoteClimateControl: string
        chargeNow: string
        viewBatteryCharge: string
        climateControl: string
        climatePresets: string
        climatePresetsDescription: string
        climatePresetsDescription2: string
        biometricAuthentication: string
        biometricAuthenticationDescription: string
        biometricAuthenticationDescription2: string
        liveChat: string
        liveChatDescription: string
        climateControlStop: string
        vehicleStatus: string
        offersEvents: string
        setDriverAlerts: string
        monitorStatus: string
        vehicleHealth: string
        vehicleConditionCheck: string
        serviceReminder: string
        messages: string
        specialOffersEvents: string
        receiveRecall: string
        specialOffers: string
        subaruEvents: string
        driverAlertsSettings: string
        getAlerts: string
        boundaryAlerts: string
        speedAlerts: string
        curfewAlerts: string
        scheduleManageServices: string
        scheduleService: string
        serviceHistory: string
        maintenanceSchedule: string
        enterService: string
        support: string
        supportButton: string
        roadsideAssistance: string
        starlinkCustomerCare: string
        subaruCustomerCare: string
        exitDemo: string
        actionPending: string
        vehicleHealthCannotUpdated: string
        offers: string
        personalCoupons: string
        noEvents: string
        disclaimer: string
        healthReport: string
        lastUpdated: string
        details: string
        vehicleRecallAlert: string
        offersEventsNoBr: string
        subscriptionServices: string
        upgradeNow: string
        starlinkErrorHeader: string
        service: string
        starlinkRemoteServices: string
        doNotHaveSafetyBenefits: string
        learnMoreAboutStarlink: string
        servicesNotFunctioning: string
        findYourRetailer: string
        tradeUpProgram: string
        lessThanExpect: string
        learnMore: string
        whatIsNew: string
        introducingDestinations: string
        crossCountryVacation: string
        connectToYourVehicle: string
        saveItForFuture: string
        favoriteSpots: string
        trackYourFavoriteLocations: string
        healthIsGood: string
        issueNoted: string
        issuesNoted: string
        recallAlert: string
        repeatRES: string
        adjustDelayedStart: string
        adjustClimateSettings: string
    },
    hornLightPanel: {
        title: string
        hornLights: string
        justLights: string
    },
    importantMessage: {
        title: string
        renewalNotice: string
        aboutRenewal: string
        renewSubscription: string
        noMessages: string
        partsArrival: string
        placeHolderCopy: string
        tireReplacement: string
        renewal: string
    },
    index: {
        menu: string
        myVehicle: string
        myVehicles: string
        startlink: string
        startlinkConnectedServices: string
        remoteCommands: string
        logout: string
        visitInfotainmentApp: string
        driverAlerts: string
        subscriptionServices: string
        manageServices: string
        wifiSubscription: string
        warrantyExtended: string
        customerSupport: string
        communicationPreferences: string
        editMyVehicle: string
        updateVehicleInformation: string
        sendingRequest: string
        settings: string
        securitySettings: string
        password: string
        securityQuestions: string
        dustingOffRoadMap: string
        preparingForAdventure: string
        packingUpTheSubaru: string
        back: string
        certifiedCollisionCenters: string
    },
    interestsAndActivity: {
        title: string
        subscribeAllLifestyles: string
        adventureFestivals: string
        antiques: string
        autoShows: string
        biking: string
    },
    invoices: {
        title: string
        invoicesRefundNotices: string
        viewAll: string
        manualRefundCopy: string
        invoiceNumber: string
        type: string
        amount: string
        viewInvoice: string
        viewRefund: string
        notApplicable: string
        invoice: string
        automaticRefund: string
        manualRefund: string
        invoiceDetails: string
        chargeSummary: string
        expiresRenews: string
        subtotal: string
        tax: string
        amountPaid: string
        paymentMethod: string
        refundDetails: string
        refundSummary: string
        originalInvoiceNumber: string
        refundNumber: string
        refundDate: string
        originalInvoiceDate: string
        amountRefunded: string
        view: string
        noInvoicesAndRefunds: string
        starlinkSafety: string
        starlinkRemoteServices: string
        starlinkConcierge: string
    },
    legalDisclaimers: {
        title: string
        openInNewPage: string
        mySubaruPrivacyPolicy: string
        mySubaruTermsConditions: string
        starlinkPrivacyPolicy: string
        starlinkTermsConditions: string
    },
    appSettings: {
        title: string
        incorrectPin: string
        unableToSetup: string
        forPin: string
        biometricsDisclaimer: string
        biometricsDisclaimerContinued: string
        biometricsSetupTitle: string
        enterPin: string
        ajaxFailedMessage: string
    },
    login: {
        username: string
        password: string
        welcome: string
        rememberUsernamePassword: string
        autoLogin: string
        logIn: string
        forgotSomething: string
        demoMode: string
        lastSignOn: string
        sendUpdateAfterSave: string
        loginFormValidateMessages: {
            loginUsername: string
            password: string
        },
        accountCreationAged: string
        accountCreationRecent: string
        loginError: string
        mySubaruAppVersion: string
        versionInfo: string
        invalidPassword: string
        passwordWarning: string
        accountLocked: string
        noVehiclesOnAccount: string
        accountNotFound: string
        invalidAccount: string
        noSecurityQuestionsConfigured: string
        tooManyAttemptsDescription: string
        loginErrorDefault: string
        tooManyAttempts: string
        unableToAddDevice: string
        unableToAddDeviceDescription: string
        unableToLogin: string
        twoStepAuthTooManyAttempts: string
    },
    mailSub: {
        title: string
        mailingAddress: string
        driveMagazine: string
        driveMagazineDescription: string
        drivePerformanceMagazine: string
        drivePerformanceMagazineDescription: string
        addedSecurity: string
        addedSecurityDescription: string
        unsubscribeDescription: string
    },
    maintenanceSchedule: {
        maintenanceInterval: string
        updateMileage: string
        contactRetailer: string
        recommendedMaintenance: string
        severeDrivingCondition: string
        severeDrivingConditionList: string
        maintenanceSchedules: string
        nextService: string
        selectScheduleMessage: string
        changeMaintenanceMessage: string
        severe: string
        normal: string
        apiNextServiceError: string
        apiPutSeveritySuccess: string
        apiPutServerityError1: string
        apiPutServerityError2: string
        currentMaintenanceSchedule: string
        changeMaintenanceType: string
        maintenanceType: string
        modalChangeToSevere: string
        modalChangeToNormal: string
        currentScheduleTypeNormalDescription: string
        currentScheduleTypeSevereDescription: string
        beyondListedIntervals: string
        careConnectDealerError: string
    },
    manage_subscription: {
        currentSubscription: string
        freeTrial: string
        subscriptionExtend: string
        autoRenewExtend: string
        upgradeSubscription: string
    },
    manageVehicle: {
        title: string
        addNewVehicle: string
        estimatedMileage: string
        selectTimezone: string
        noLongerOwn: string
        editVehicle: string
        visitDesktop: string
        visitMySubaru: string
    },
    messageCenterLanding: {
        subaruMessageCenter: string
        specialOffers: string
        subaruEvents: string
        tradeUpProgram: string
        tradeUpDescription: string
        tradeUpNoQuoteDescription: string
        tradeUpOfferBtn: string
        tradeUplearnMoreBtn: string
        tradeUpDisclaimer: string
    },
    myProfile: {
        title: string
        starlinkCommunicationPreferences: string
    },
    myProfileEdit: {
        cannotAlteredMessage: string
        emailUsername: string
        emailAddress: string
        changeUsernameAlert: string
        confirmEmailAddress: string
        editEmail: string
        editContactInformation: string
        telephone: string
        homePhone: string
        workPhone: string
        editPhoneNumbers: string
        mailingAddress: string
        address: string
        address2: string
        editAddress: string
        editTelephone: string
        editProfile: string
        securitySettings: string
        updateAdditional: string
        updateMobilePhone: string
        sendVerificationCode: string
        submitVerificationCode: string
        emailFormValidateMessages: {
            email: {
                email: string
                required: string
            },
            emailConfirm: {
                required: string
                equalTo: string
                confirmationEmail: string
            },
            loginUsername: string
            password: string
        },
        addressFormValidateMessages: {
            city: {
                required: string
            },
            zip5Digits: {
                required: string
            },
            address: {
                required: string
                alphanumericSpaceAddress: string
            },
            address2: {
                alphanumericSpaceAddress: string
            }
        },
        customerInfoError: string
        changeEmailMessage: string
        mobilePhoneRequired: {
            cellularPhone: {
                required: string
            }
        },
        onePhoneRequired: string
        invalidPassword: string
        unableToSendVerification: string
        phoneNumberUpdated: string
        badVerificationCode: string
        saveAddress: string
        contactInformationUpdated: string
        contactInformationUpdatedDescription: string
        emailExists: string
        incorrectPassword: string
        profileUpdateError: string
        editEmailInfoMessage: string
        contactInfoDescription: string
        genderInfoDescription: string
        savePhoneNumbers: string
        saveEmail: string
        updateMobilePhoneFormValidateMessages: {
            password: {
                required: string
            }
        },
        verifyMobilePhoneFormValidateMessages: {
            verificationCode: {
                required: string
            }
        },
        rightToRepairCancelWarning: string
    },
    myProfileView: {
        editMyProfile: string
    },
    nameDevice: {
        title: string
        pageDescription: string
        deviceNameFormValidation: {
            deviceName: {
                required: string
            }
        },
        errorSavingDeviceName: string
    },
    demoFill: {
        retailer: string
    },
    message: {
        unknown: string
        invalidPassword: string
        fatalMessage: string
        fatalTitle: string
        apiTimeoutMessage: string
        apiTimeoutTitle: string
        validationTitle: string
        validationMessage: string
        okButton: string
        sessionExpiredMessage: string
        sessionExpiredTitle: string
        notConnected: string
        notConnectedRemoteCommands: string
        notConnectedTitle: string
    },
    warrantyFaqs: {
        title: string
        whatsCovered: string
        basicWarrantyInfo: string
        basicWarrantyInfoListItem1: string
        basicWarrantyInfoListItem2: string
        warrantyPeriodBegin: string
        warrantyPeriodBeginInfo: string
        whenDoTheseWarrantiesApply: string
        warrantiesInfo1: string
        warrantiesInfo2: string
    },
    warranty: {
        title: string
        myExtendedWarranty: string
        addedSecurityPlans: string
        agreementNumber: string
        agreementType: string
        agreementStatus: string
        agreementDescription: string
        agreementStartDate: string
        agreementExpirationDate: string
        disclaimer: string
        disclaimerInfo: string
        summary: string
        _1year: string
        _2year: string
        _3year: string
        _5year: string
        _7year: string
        _8year: string
        unlimitedMileage: string
        accessoriesLimitedWarranty: string
        federalWarranty: string
        newCarLimitedWarranty: string
        powertrainLimitedWarranty: string
        rustLimitedWarranty: string
        californiaDefectWarranty: string
        federalDefectWarranty: string
        lifetime: string
        seatBeltWarranty: string
        warrantyfaqs: string
        errorFetchingInformation: string
    },
    tripLog: {
        startNewTrip: string
        viewTriptrackerTutorial: string
        stopCurrentTrip: string
        selectTripEndDate: string
        selectTripDateInfo: string
        start: string
        cancel: string
        tripDate: string
        select: string
        selectTrip: string
        tripTracker: string
        editTrip: string
        tripExpiring: string
        selectNewEndDate: string
        tripSetToExpire: string
        noThanks: string
        likeToModifyTrip: string
        welcomeToMyTrips: string
        tripTrackerText: string
        planATrip: string
        tripWelcome: string
        notripLogs: string
        myTrips: string
    },
    tttutorial: {
        tutorial: string
        slideOneTitleOne: string
        slideOneTitleTwo: string
        slideOneTitleThree: string
        slideOneContent: string
        slideTwoTitle: string
        slideTwo: string
    },
    tripLogAddJournal: {
        addToJournal: string
        createJournalFormTitle: string
        selectTripsTitle: string
        selectTripsDescription: string
        journalNameLabel: string
        journalDescriptionLabel: string
        journalCategoryLabel: string
        journalCategoryPersonalLabel: string
        journalCategoryBusinessLabel: string
        journalSaveButton: string
        deleteJournalEntries: string
        deleteJournal: string
        journalCancelButton: string
        journalAddToJournalTitle: string
        saveDrivingJournal: string
        selectYourTrips: string
        confirmDrivingJournal: string
        tripsSelected: string
        createNewJournalTitle: string
        editJournalTitle: string
        editJournalHeader: string
        hasUpdated: string
        hasAdded: string
        success: string
        totalTrips: string
        maximumCharacter: string
        maximumDescriptionCharacter: string
        addJournalEntryValidateMessages: {
            journalName: {
                required: string
                maxlength: string
                alphanumericSpaceWithQuotesAmp: string
            },
            journalDescription: {
                required: string
                maxlength: string
            }
        },
        saveLocationName: string
        newLocationName: string
        currentLocationName: string
        editLocationName: string
        locationNameValidityMessages: {
            locationName: {
                inputText: string
            }
        },
        selectedTrips: string
    },
    vehicleStatusLanding: {
        vehicleStatus: string
        vehicleHealthReport: string
        vehicleConditionCheck: string
        serviceReminder: string
        recalls: string
    },
    vehicleInformation: {
        title: string
        vehicleNickname: string
        currentMileage: string
        estimatedMileage: string
        lastRecordedMileageLabel: string
        estimatedMileageLabel: string
        estimated: string
        model: string
        year: string
        engine: string
        transmission: string
        exteriorColor: string
        interiorColor: string
        licensePlateNumber: string
        licensePlateState: string
        selectTimeZone: string
        guaranteedTradeInValue: string
        disclaimerInfo: string
        addedSecurityInformation: string
        agreementDescription: string
        agreementExpirationDate: string
        starlink: string
        currentPlan: string
        mileageDescription1: string
        mileageDescription2: string
        mileageDescription3: string
        errorFetchingInformation: string
        updateMileage: string
        vehicleInfoUpdated: string
        vehicleInfoUpdatedAL0: string
        vehicleInfoUpdatedAL1: string
        vehicleInfoUpdatedAL2: string
        updateVehicle: string
        autoRenews: string
        exp: string
        vehicleInfoValidateMessages: {
            vin: {
                inputText: string
            },
            nickname: {
                required: string
            },
            licensePlate: {
                required: string
            },
            licensePlateState: {
                required: string
            },
            timeZone: {
                required: string
            }
        }
    },
    vehicleHealth: {
        title: string
        noAttentionRequired: string
        attentionRequired: string
        findARetailer: string
        recordAServiceWithBreak: string
        displayFullVehicleHealthReport: string
        systemsThatAreFunctioningNormal: string
        vehicleHealthCannotBeUpdated1: string
        scheduleAnAppointment: string
        vehicleHealthCannotBeUpdated2: string
        displayReport: string
        minimizeReport: string
        airbag: {
            header: string
            style: string
            description: string
        },
        awd: {
            header: string
            style: string
            description: string
        },
        abs: {
            header: string
            style: string
            description: string
        },
        oilTemp: {
            header: string
            style: string
            description: string
        },
        blindspot: {
            header: string
            style: string
            description: string
        },
        chargeSystem: {
            header: string
            style: string
            description: string
        },
        engineFail: {
            header: string
            style: string
            description: string
        },
        ebd: {
            header: string
            style: string
            description: string
        },
        pkgBrake: {
            header: string
            style: string
            description: string
        },
        oilWarning: {
            header: string
            style: string
            description: string
        },
        eyesight: {
            header: string
            style: string
            description: string
        },
        hybridSystem: {
            header: string
            style: string
            description: string
        },
        iss: {
            header: string
            style: string
            description: string
        },
        oilPres: {
            header: string
            style: string
            description: string
        },
        passairbag: {
            header: string
            style: string
            description: string
            warning: {
                style: string
                description: string
            }
        },
        epas: {
            header: string
            style: string
            description: string
        },
        revBrake: {
            header: string
            style: string
            description: string
        },
        telematics: {
            header: string
            style: string
            description: string
        },
        tpms: {
            header: string
            style: string
            description: string
        },
        vdc: {
            header: string
            style: string
            description: string
        },
        washer: {
            header: string
            style: string
            description: string
        },
        srh: {
            header: string
            style: string
            description: string
        },
        ahbl: {
            header: string
            style: string
            description: string
        },
        pedairbag: {
            header: string
            style: string
            description: string
        },
        provisionError: {
            header: string
            style: string
            description: string
        }
    },
    vehicleConditionCheck: {
        title: string
        vehicleStatus: string
        viewInformation: string
        lastUpdate: string
        tirePressure: string
        tirePressureInfo: string
        odometer: string
        range: string
        averageMpg: string
        vehicleConditionCheckCannotBeUpdated: string
        scheduleAnAppointment: string
        inVehicleWifiSubscription: string
        vehicleTimezoneNotSet: string
        VehicleInfoMessage: string
    },
    updateAccount: {
        title: string
        updatePasswordInfo: string
        currentPassword: string
        newPassword: string
        confirmPassword: string
        securityQuestion1: string
        selectSecurityQuestion1: string
        securityQuestion2: string
        selectSecurityQuestion2: string
        securityQuestion3: string
        selectSecurityQuestion3: string
        updateAccountFormValidateMessages: {
            oldPassword: string
            password: {
                required: string
                minlength: string
                notEqualTo: string
            },
            passwordConfirmation: {
                equalTo: string
            },
            question1: {
                required: string
            },
            question2: {
                required: string
            },
            question3: {
                required: string
            },
            answer1: {
                required: string
                minlength: string
                maxlength: string
            },
            answer2: {
                required: string
                minlength: string
                maxlength: string
            },
            answer3: {
                required: string
                minlength: string
                maxlength: string
            }
        },
        accountHasBeenUpdated: string
        incorrectPassword: string
        unableToUpdateAccount: string
        currentPwd: string
        newPwd: string
        confirmPwd: string
    },
    unlockSettingPanel: {
        unlock: string
        allDoors: string
        justDriverDoor: string
        tailgate: string
    },
    tutorials: {
        title: string
        browserDoesnotSupportVideo: string
        slideBladeDriverAlerts: string
        tapStartCurfew: string
        chooseTime: string
        curfewEnd: string
        tapAddAdditionalCurfew: string
        tapNextSaveCurfew: string
        giveAlertName: string
        tapSaveCurfew: string
        tapStartSpeed: string
        chooseHowFast: string
        chooseHowLong: string
        tapNextSaveSpeed: string
        tapSaveSpeed: string
        tapStartBoundary: string
        enterCenter: string
        dragCircle: string
        chooseShape: string
        chooseExitEnter: string
        tapNext: string
        giveBoundaryAlertName: string
        tapSaveBoundary: string
        slideBladeRemoteServices: string
        tapWhenStartEngine: string
        createComfortLevel: string
        chooseManual: string
        chooseAuto: string
        tapStart: string
        tapSetActive: string
        deleteEditCurfew: string
        deleteEditSpeed: string
        deleteEditBoundary: string
    },
    tripsSearch: {
        trips: string
        createATrip: string
        editTrip: string
        deleteTrip: string
        destinationSendToVehicle: string
        sendToVehicle: string
        recenter: string
        addAnotherStop: string
        searchForALocation: string
        reachedMaximumLevel: string
        favoriteError: string
        deleteFavoriteError: string
        deleteAllFavoritesError: string
        deleteAllTripsError: string
        updateFavoriteError: string
        saveWorkError: string
        saveTripError: string
        deleteTripError: string
        retrieveFavoritesError: string
        retrieveTripsError: string
        savedTrips: string
        saveTrip: string
        favorites: string
        nameFavorite: string
        destinationSearch: string
        favoriteDestinations: string
        nameTrip: string
        tripSaveLimit: string
        favoritesSaveLimit: string
        addOneDestination: string
        confirmRemoveDestiniation: string
        confirmDeleteTrip: string
        confirmDeletePoi: string
        destinationsDescription1: string
        destinationsDescription2: string
        savedTripsAndFav: string
        noSearchResults: string
        addDestinationToTrip: string
        currentTrip: string
        enterDestination: string
        destinationName: string
        saveTripEdit: string
        sendTripToVeh: string
        pleaseAddATrip: string
        sendDestinationToVeh: string
        cancelEdit: string
        maxTripsMessage: string
        maxFavsMessage: string
        maxDestinationsMessage: string
        viewTripDetails: string
        hasBeenSaved: string
        deleteDestination1: string
        deleteDestination2: string
        allTripsDeleted: string
        deleteAllFavDes: string
        deleteAllSavedTrips: string
        allFavoritesDeleted: string
        favPoisNotDeletedError: string
        hasbeenDeleted: string
        manageSavedTrips: string
        noSavedTrips: string
        noSavedFavTripsMessage: string
        unableToUnFav1: string
        unableToUnFav2: string
        deleteDestinationMsg1: string
        deleteDestinationMsg2: string
        backToSavedTrips: string
        editWorkAddress: string
        toEditRetailerMessage: string
        toEditHomeMessage: string
        favDestinationValidateMessages: {
            favDestinationName: {
                required: string
                maxlength: string
                alphanumericSpaceWithQuotesAmp: string
            }
        },
        tripNameValidateMessages: {
            TripName: {
                required: string
                maxlength: string
                alphanumericSpace: string
                nameAlreadyExist: string
            }
        },
        favoriteSaved: string
        workSaved: string
        minimumSavedTripError: string
        deleteTripConfirm1: string
        deleteTripConfirm2: string
    },
    tipVideos: {
        howToVideos: string
        checkingFluids1: string
        checkingFluids2: string
        checkingFluids3: string
        checkingFluids4: string
        checkingFluids5: string
        wornTires: string
        tirePressure: string
        tireRotation: string
        wheelAlignment: string
        wheelBalance: string
        brakeRepair: string
        batteryReplacement: string
        engineAirFilter: string
        cabinAirFilter: string
        wiper: string
        shocks: string
        engineLight: string
        browserDoesnotSupportVideo: string
        scheduleMaintenance: string
        whySubaruService: string
    },
    tipsInfo: {
        resourceCenter: string
        howToVideos: string
        faqs: string
        bluetoothCompatibility: string
        manuals: string
        tutorials: string
        stolenVehicleRecoveryMode: string
        multimediaApp: string
    },
    tipFaqs: {
        title: string
        account: string
        howDoIAutoLogin: string
        howDoIAutoLoginAnswer: string
        howDoIUpdateMyPin: string
        howDoIUpdateMyPinAnswer: string
        howDoIChangeMyUsername: string
        howDoIChangeMyUsernameAnswer: string
        howDoIChangeMyFirstAndLastName: string
        howDoIChangeMyFirstAndLastNameAnswer: string
        whatIsAnAuthorizedUser: string
        whatIsAnAuthorizedUserAnswer1: string
        whatIsAnAuthorizedUserAnswer2: string
        howDoIFindMyAuthorizedDevice: string
        howDoIFindMyAuthorizedDeviceAnswer: string
        howDoINameMyAuthorizedDeviceAnswer1: string
        howDoIRemoveAnAuthorizedUser: string
        howDoIRemoveAnAuthorizedUserAnswer: string
        howDoIUpdateMyBillingInformation: string
        howDoIUpdateMyBillingInformationAnswer: string
        howIsMyMileageUpdated: string
        howIsMyMileageUpdatedAnswer1: string
        howIsMyMileageUpdatedAnswer2: string
        howIsMyMileageUpdatedAnswer3: string
        howIsMyMileageUpdatedAnswer4: string
        howIsMyMileageUpdatedAnswer5: string
        howDoISwitchBetweenVehiclesInAnAccount: string
        howDoISwitchBetweenVehiclesInAnAccountAnswer: string
        howDoIAddAnotherVehicleOnMyAccount: string
        howDoIAddAnotherVehicleOnMyAccountAnswer: string
        whyCantAccessSafetySecurityFeature: string
        whyCantAccessSafetySecurityFeatureAnswer: string
        retailerService: string
        howDoIChangeMyPreferredRetailer: string
        howDoIChangeMyPreferredRetailerAnswer: string
        howDoIScheduleAnAppointment: string
        howDoIScheduleAnAppointmentAnswer: string
        howDoICancelAnAppointment: string
        howDoICancelAnAppointmentAnswer: string
        howDoIFindInformationAboutMyPreferredRetailer: string
        howDoIFindInformationAboutMyPreferredRetailerAnswer: string
        howDoIRecordAPreviousServiceVisit: string
        howDoIRecordAPreviousServiceVisitAnswer: string
        starlinkRemoteServices: string
        howDoIKnowWhatMyTirePressureIs: string
        howDoIKnowWhatMyTirePressureIsAnswer: string
        howLongWillMyCarRunWhenRemoteEngineStartIsInProgress: string
        howLongWillMyCarRunWhenRemoteEngineStartIsInProgressAnswer: string
        howLongWillMyCarRunWhenRemoteClimateControlIsInProgress: string
        howLongWillMyCarRunWhenRemoteClimateControlIsInProgressAnswer: string
        WhyIsMyResEngineRunOnlyTenMin: string
        WhyIsMyResEngineRunOnlyTenMinAnswer: string
        canILockMyVehicleWithMyKeysInTheCar: string
        canILockMyVehicleWithMyKeysInTheCarAnswer: string
        howCloseDoIHaveToBeForRemoteServicesToWork: string
        howCloseDoIHaveToBeForRemoteServicesToWorkAnswer: string
        ifIUnlockMyCarWillItAutomaticallyRelock: string
        ifIUnlockMyCarWillItAutomaticallyRelockAnswer: string
        whyWontMyCarStartCharging: string
        whyWontMyCarStartChargingAnswer: string
        howDoIGetTheKeysOut: string
        howDoIGetTheKeysOutAnswer: string
        subscriptions: string
        howDoIUpgrade: string
        howDoIUpgradeAnswer: string
        howDoIDowngrade: string
        howDoIDowngradeAnswer: string
        howDoICancelASubscription: string
        howDoICancelASubscriptionAnswer: string
        whyAmISeeingCreditCardCharge: string
        whyAmISeeingCreditCardChargeAnswer: string
        whyAmIReceivingManualRefund: string
        whyAmIReceivingManualRefundAnswer: string
        refundInformation: string
        subscriptionServices: string
        howDoICreateABoundaryAlert: string
        howDoICreateABoundaryAlertAnswer: string
        howDoIKnowIfMyVehicleAlertsAreActive: string
        howDoIKnowIfMyVehicleAlertsAreActiveAnswer: string
        howDoICreateASpeedAlert: string
        howDoICreateASpeedAlertAnswer: string
        howDoICreateACurfewAlert: string
        howDoICreateACurfewAlertAnswer: string
        howManyVehicleAlertsCanBeActiveAtOneTime: string
        howManyVehicleAlertsCanBeActiveAtOneTimeAnswer: string
        whyDoINotHaveRemoteServices: string
        whyDoINotHaveRemoteServicesAnswer1: string
        whyDoINotHaveRemoteServicesAnswer2: string
        whyDoINotHaveRemoteServicesAnswer3: string
        whyDoINotHaveDriverAlerts: string
        whyDoINotHaveDriverAlertsAnswer: string
        whyDoINotHaveDriverAlertsAnswer1: string
        whyDoINotHaveDriverAlertsAnswer2: string
        whyDoINotHaveDriverAlertsAnswer3: string
        howDoIUpdateMyCreditCard: string
        howDoIUpdateMyCreditCardAnswer: string
        howDoIReportMyVehicleStolen: string
        howDoIReportMyVehicleStolenAnswer1: string
        howDoIReportMyVehicleStolenAnswer2: string
        howManyChargingSchedulesCanBeActiveAtOneTime: string
        howManyChargingSchedulesCanBeActiveAtOneTimeAnswer: string
        wifi: string
        howDoISignUpForWifi: string
        howDoISignUpForWifiAnswer1: string
        howDoISignUpForWifiAnswer2: string
        howDoISignUpForWifiAnswer3: string
        howDoICancelMyWifi: string
        howDoICancelMyWifiAnswer: string
        howDoICancelMyWifiAnswer1: string
        howDoIEnableBiometrics: string
        howDoIEnableBiometricsAnswer1: string
        howDoIEnableBiometricsAnswer2: string
        howDoIEnableBiometricsAnswer2a: string
        howDoIEnableBiometricsAnswer3: string
        howDoIEnableBiometricsAnswer4: string
        howDoIDisableBiometrics: string
        howDoIDisableBiometricsAnswer1: string
        howDoIDisableBiometricsAnswer2: string
        howDoIDisableBiometricsAnswer2a: string
        howDoIDisableBiometricsAnswer3: string
        multimedia: string
        bluetoothCompatibility: string
        bluetoothCompatibilityAnswer: string
        howDoISetupAppleCarplay: string
        appleCarplayListItem1: string
        appleCarplayListItem2: string
        appleCarplayListItem3: string
        appleCarplayListItem4: string
        appleCarplayListItem5: string
        appleCarplayListItem6: string
        appleCarplayListItem7: string
        appleCarplayListItem8: string
        appleCarplayListItem9: string
        howDoISetupAndroidAuto: string
        androidAutoListItem1: string
        androidAutoListItem2: string
        androidAutoListItem3: string
        androidAutoListItem4: string
        androidAutoListItem5: string
        androidAutoListItem6: string
        androidAutoListItem7: string
        androidAutoListItem8: string
        androidAutoListItem9: string
        androidAutoListItem10: string
        androidAutoListItem11: string
        androidAutoListItem12: string
        androidAutoListItem13: string
        androidAutoListItem14: string
        whereDoIGetHelpAndSignUpForSxm: string
        whereDoIGetHelpAndSignUpForSxmAnswer: string
        glossary: string
        authorizedUser: string
        authorizedUserAnswer: string
        authorizedDevice: string
        authorizedDeviceAnswer: string
        remoteStart: string
        remoteStartAnswer: string
        locateVehicle: string
        locateVehicleAnswer: string
        curfewAlert: string
        curfewAnswer: string
        speedAlert: string
        speedAlertAnswer: string
        boundaryAlert: string
        boundaryAnswer: string
        concierge: string
        conciergeAnswer: string
        retailer: string
        retailerAnswer: string
        emergencyContact: string
        emergencyContactAnswer: string
        preferredRetailer: string
        preferredRetailerAnswer: string
        vehicleAlerts: string
        vehicleAlertsAnswer: string
        chargeNow: string
        chargeNowAnswer: string
        remoteBatteryChargingTimer: string
        remoteBatteryChargingTimerAnswer: string
        remoteClimateControl: string
        remoteClimateControlAnswer: string
    },
    securityQuestion: {
        title: string
        authorizeDevice: string
        answer: string
        securityQuestionFormValidateMessages: {
            question1: {
                required: string
            },
            question2: {
                required: string
            },
            question3: {
                required: string
            },
            answer1: {
                required: string
                minlength: string
                maxlength: string
            },
            answer2: {
                required: string
                minlength: string
                maxlength: string
            },
            answer3: {
                required: string
                minlength: string
                maxlength: string
            }
        },
        saveSecurityQuestions: string
        securityQuestionsUpdated: string
        incorrectPassword: string
        unableUpdate: string
        securityQuestionValidation: {
            securityQuestionAnswer: string
        },
        unableToAuthenticateDevice: string
        invalidRequest: string
        tooManyAttempts: string
        invalidAnswer: string
        invalidAnswerDescription: string
        failedSecurityCheck: string
        failedSecurityCheckDescription: string
    },
    twoStepAuthentication: {
        title: string
        authorizeDevice: string
        twoStepAuthenticationValidation: {
            verificationCode: {
                required: string
                maxlength: string
            }
        },
        unableToAuthenticateDevice: string
        invalidRequest: string
        errorValidatingVerificationCode: string
        badVerificationCode: string
        twoStepHeader: string
        dontRecognize: string
        pleaseVerify: string
        chooseContactMethod: string
        helpDisclaimer: string
        termsToggle: string
        verifyInputTitle: string
        verifyInputSubTitle: string
        codeWaitText: string
        enterCode: string
        resend: string
        verificationCodeLabel: string
        rememberDevice: string
        rememberHelperText: string
        didYouKnow: string
        havingTroubleTitle: string
        havingTroubleText: string
        accountLockedTitle: string
        lockedOutText: string
        accountLocked: string
        accountLocked2: string
    },
    subscriptionServices: {
        title: string
        starlinkSubscriptions: string
        currentlyNoSubscription: string
        startYourSubscription: string
        currentlyNoSubscriptionPhev: string
        subscribeNow: string
        subscriptionCannotBeCompleted: string
        unexpectedError: string
        currentlySubscribed: string
        manageYourSubscription: string
        wifiSubscription: string
        signUpSubscription: string
        billingInformation: string
        keepBillingInformationUpToDate: string
        updateBillingInformation: string
        mapUpdates: string
        ensureMapsUpToDate: string
        purchaseMapUpdates: string
        attWifiState: {
            N: string
            S: string
            P: string
            F: string
            R: string
            attWifiStateError: string
        },
        sxmSubscription: string
        sxmRadioLoadingMessage: string
        sxmRadioDefaultDestinationLabel: string
        sxmRadioStateError: string
        mapUpdateExtUrl: {
            NAV_HERE: string
            NAV_TOMTOM: string
        },
        noServicesOrSubscription: string
    },
    subscriptionUpgrade: {
        upgradeSubscription: string
        manageSubscription: string
        giveABoost: string
        starlinkSecurityPlusServices: string
        accessYourVehicleFeatures: string
        addYourOptionalUpgrade: string
        monthlySecurityPlusSubscription: string
        startAFreeSecurityPlusTrial: string
        autorenewAsMonthlySubscription: string
        renewalDateExtended: string
        includesFreeTrial: string
        newFeaturesInclude: string
        takeAdvantage: string
        perMonth: string
        allSafetyPlusFeatures: string
        stolenVehicleRecoveryPlus: string
        stolenVehicleImmobilizer: string
        vehicleSecurityAlarmNotification: string
        remoteLockUnlock: string
        remoteHornLights: string
        remoteVehicleLocator: string
        remoteEngineStart: string
        remoteVehicleConfiguration: string
        tripLogs: string
        valetModeNotifications: string
        destinationToVehicle: string
        boundaryAlert: string
        speedAlert: string
        curfewAlert: string
        remoteClimateControl_phev: string
        remoteBatteryChargingTimer_phev: string
        enhanceYourSecurityPlus: string
        starlinkConcierge: string
        starlinkConciergeDescription1: string
        starlinkConciergeDescription2: string
        starlinkConciergeDescription3: string
        monthlyConciergeSubscription: string
        conciergeServiceExtended: string
        allSafetyAndSecurityPlusFeatures: string
        allSafetyAndSecurityPlusFeaturesPHEV: string
        hotelReservations: string
        rentalCar: string
        uberOrTaxi: string
        airlineOrTrainTickets: string
        restaurantRecommendations: string
        sportingEventsTickets: string
        orderDetails: string
        estimatedTotal: string
        iAgree: string
        paymentInformation: string
        creditCard: string
        updateCreditCard: string
        cardNumber: string
        cvv: string
        expirationMonth: string
        expirationYear: string
        pleaseSelect: string
        billingInformation: string
        sameAsHomeAddress: string
        firstName: string
        lastName: string
        addressLine1: string
        addressLine2: string
        city: string
        state: string
        zip: string
        cancelBillingChange: string
        saveBillingInformation: string
        changeBillingInformation: string
        thanksForYourOrder: string
        addRequiredDetails: string
        addEmergencyContacts: string
        useManageSubscriptionsPage: string
        starlinkPlanSummary: string
        offer: string
        promotion: string
        applied: string
        isNotAnActivePromotion: string
        scheduledToActivate: string
    },
    subscriptionModify: {
        starlinkSubscription: string
        safetyComesFirst: string
        safetyPlusDescription: string
        chooseTheLengthOfYourPlan: string
        includesFree3YearTrial: string
        sosEmergencyAssistance: string
        enhancedRoadsideAssistance: string
        collisionNotification: string
        maintenanceNotifications: string
        vehicleHealthReports: string
        vehicleConditionCheck: string
        diagnosticAlerts: string
        serviceAppointmentScheduler: string
        securityPlus: string
        enhanceYourRemoteServices: string
        conciergeService: string
        currentPlan: string
        planWillBeCancelled: string
        newPlan: string
        newPlanWillBeginLater: string
        promoCode: string
        code: string
        yourSubTotal: string
        tax: string
        total: string
        salesTax: string
        featuredOffers: string
        _0PercentOff: string
        youQualifyFor10PercentOff: string
        _5PercentOff5YearPlan: string
        youQualifyFor15PercentOff: string
        _5PercentOff7YearPlan: string
        viewAllOffers: string
        allOffers: string
        _0PercentOffRemoteServices: string
        specificVehiclePromotion: string
        youQualifyForPromotion: string
        retailerPromotion: string
        aRetailerSpecificOffer: string
    },
    subscriptionManage: {
        yourCurrentSubscription: string
        subscriptionNote: string
        upgradeToday: string
        extendYourSecurityPlusPlan: string
        updateSubscriptionInformation: string
        changeYourSubscription: string
        makeChangesToYourSubscription: string
        changeSubscription: string
        updateYourBillingInformation: string
        makeSureYourBillingInformationIsUpToDate: string
        updateBillingInformation: string
        unsubscribe: string
        currentPlanNotWorking: string
    },
    subscriptionEnrollment: {
        clickBelowToViewAllSpecialOffers: string
        viewSpecialOffers: string
        subscriberInformation: string
        preferredLanguage: string
        timeZone: string
        pin: string
        confirmPin: string
        selectedOfferIsNotApplicable: string
        time: string
        chooseTheTimeZone: string
        enterPhoneNumber: string
        languagePreferred: string
        selectPreferredLanguage: string
        ariaErrorMessage: string
        ariaErrorDefault: string
        notAbleToEnroll: string
        notAbleToEnrollRightToRepair: string
        genericCreditCardError: string
        cvvNoMatch: string
        zipCodeError: string
        vertexError: string
        _7error: string
        selectATimeZone: string
        bestOfBothWorlds: string
        starlinkSafetyAndSecurity: string
        starlinkSafetyAndSecurityPHEV: string
        receiveTenYearsFree: string
        freeTrial: string
        subscriberInfoFormValidateMessages: {
            mobilePhone: {
                minlength: string
            },
            timeZone: {
                required: string
            },
            pin: {
                required: string
                minlength: string
                maxlength: string
                digits: string
            },
            confirmPin: {
                required: string
                equalTo: string
            },
            termsAndConditions: {
                required: string
            }
        },
        paymentInformationFormValidateMessages: {
            cc_no: {
                required: string
                maxlength: string
            },
            cvv: {
                required: string
                maxlength: string
            },
            cc_exp_mm: {
                required: string
            },
            cc_exp_yyyy: {
                required: string
            },
            bill_first_name: {
                required: string
                maxlength: string
            },
            bill_last_name: {
                required: string
                maxlength: string
            },
            bill_address1: {
                required: string
                maxlength: string
            },
            bill_address2: {
                maxlength: string
            },
            bill_city: {
                required: string
                maxlength: string
            },
            bill_state_prov: {
                required: string
            },
            bill_postal_cd: {
                required: string
            }
        },
        upgradeConfirmationFormValidateMessages: {
            termsAndConditions: {
                required: string
            }
        },
        selectionMayRemoveYourAppliedOffer: string
        selectAPlanToCancel: string
        errorRetrievingRefundData: string
        billingInformationHasBeenUpdated: string
        subscription: string
        startDate: string
        autoRenews: string
        exp: string
        month: string
        year: string
        monthly: string
        calculating: string
        rightToRepairSelectState: string
    },
    subscriptionCancel: {
        cancelStarlinkSubscription: string
        yourCurrentPlan: string
        details: string
        estimatedRefund: string
        cancelSubscription: string
        subscriptionCancelled: string
        cancelSafetyMessage: string
        cancelRemoteOnlyMessage: string
        cancelConciergeOnlyMessage: string
        cancelRemoteConciergeMessage: string
        badCreditCardMessage: string
        leaseFinanceThanks: string
        returnToSubscriptions: string
        verifyCancelRemote: string
        conciergeServicesWillBeRemoved: string
        verifyCancelSafety: string
        otherServicesWillBeRemoved: string
        confirmInformation: string
        confirmYourBankIsStillTheSame: string
        confirmYourBankInformation: string
        confirmThatYouPaidOffTheLoan: string
        supplySupportingDocumentation: string
        willReceiveAnEmail: string
    },
    subaruCustomerCare: {
        subaruCustomerSupport: string
        needAnswers: string
        callNumber: string
        email: string
        friday: string
        saturday: string
    },
    stolenVehicle: {
        stolenVehicleRecoveryMode: string
        stepsToLocateVehicle: string
        fileAReport: string
        verifyYourIdentity: string
        verifyWithLocalAuthorities: string
        vehiclePlacedInStolenMode: string
        remoteServicesSuspended: string
        stolenVehicleLocationInfo: string
        stolenVehicleNote: string
    },
    starlinkPlan: {
        subscriptionDetails: string
        currentStarlinkPlan: string
        safetyAndSecurityPlan: string
        packageIncludes: string
        safetyPlusPackage: string
        stolenVehicleRecovery: string
        remoteHornLights: string
        manageAccount: string
    },
    starlinkLocation: {
        location: string
    },
    starlinkCustomerCare: {
        title: string
        callSupport: string
        callNumber: string
        alwaysAvailable: string
    },
    speedAlertSetting: {
        notifyVehicleExceeds: string
        speedAlertDescription: string
        durationUntilAlerted: string
        alertTriggerDescription: string
        saveSetting: string
    },
    speedAlertLanding: {
        vehicleName: string
        createAlerts: string
        createANewSpeedAlert: string
        reachedLimit: string
        viewTutorial: string
        deleteAlert: string
        editAlert: string
        sendToVehicle: string
        deactivateAlert: string
        nameThisSetting: string
    },
    setDelay: {
        delaySettings: string
        noDelay: string
        _1MinuteDelay: string
        _5MinuteDelay: string
        _0MinuteDelay: string
    },
    serviceReminder: {
        title: string
        vehicleEstimatedMileagePart1: string
        vehicleEstimatedMileagePart2: string
        serviceHistoryDue: string
        updateMileage: string
        noServiceReminders: string
        recommendedIntervals: string
        examples: string
        severeDrivingListItem1: string
        severeDrivingListItem2: string
        severeDrivingListItem3: string
        severeDrivingListItem4: string
        severeDrivingListItem5: string
        severeDrivingListItem6: string
        severeDrivingListItem7: string
        mileService: string
        recommendedMaintenance: string
        maintenanceScheduleError: string
        mileageDescription1: string
        mileageDescription2: string
        mileageDescription3: string
    },
    serviceLanding: {
        serviceHistory: string
        enterService: string
        enterServiceRecord: string
    },
    serviceHistory: {
        noteDescription: string
        addServiceHistory: string
        enteredBy: string
        serviceInterval: string
        comments: string
        repairOrderErrorMessage: string
    },
    searchForRetailer: {
        findASubaruRetailer: string
        enterZipcode: string
    },
    scheduleTime: {
        scheduleServiceWith: string
        selectYourPreferredTime: string
        lookForMoreAppointments: string
        viewMoreAvailableTimes: string
        noOnlineAppointments: string
        noAppointmentsXtimeInterval1: string
        noAppointmentsXtimeInterval2: string
        technicalIssues: string
        endOfAppointmentLookup: string
    },
    scheduleSummary: {
        reviewDetails: string
        appointmentFor: string
        wouldLikeTo: string
        dropOffVehicle: string
        waitAtDealership: string
        confirmAppointment: string
        appointmentConfirmation: string
        giveUsACall: string
        rentalsAvailable: string
    },
    scheduler: {
        selectADifferentRetailer: string
        cancelDialogTitle: string
        cancelAppointment: string
        wantToCancelAppointment: string
        appointmentCancelledDialogTitle: string
        appointmentHasBeenCancelled: string
        unableToRetrieveServices: string
        emptyServiceList: string
        pleaseSelectAtleastOneService: string
        viewFewerAvailableTimes: string
        unableToRetrieveDates: string
        unableToCancelAppointment: string
        subaruExpressService: string
        expressServiceTitle: string
        technicalIssues: string
    },
    scheduleDate: {
        selectAnAvailableDate: string
    },
    scheduleConfirm: {
        appointmentConfirmedFor: string
        addToCalendar: string
    },
    rsc_preview: {
        remoteServiceCommunications: string
        primaryPhoneNumber: string
        lockVehicle: string
        unlockVehicle: string
        hornLights: string
        alarm: string
        stolenVehicleTracker: string
        vehicleHealthPreferences: string
        emailCommunicationsSentTo: string
        warningLightsCommunications: string
        vehicleHealthAndUsageReport: string
        serviceScheduleSupport: string
        phone: string
    },
    rsaStatus: {
        roadsideAssistance: string
        roadsideHistory: string
        youWillReceiveCommunication: string
        statusHistory: string
        date: string
        requestStatus: string
        refreshRequestStatus: string
    },
    rsaForm: {
        requestingRoadsideAssistance: string
        whatsTheProblem: string
        reasonForAssistance: string
        selectAReason: string
        lockout: string
        keysBroken: string
        vehicleStuck: string
        outOfFuel: string
        accident: string
        oneFlatTire: string
        multipleFlatTires: string
        tow: string
        jumpStartDidnotStall: string
        jumpStartStalled: string
        unknownProblem: string
        detailsAboutYourNeeds: string
        middleInitial: string
        callbackNumber: string
        yourCurrentLocation: string
        getMyLocation: string
        preferredContactMethod: string
        notificationPreference: string
        pleaseSelectAPreference: string
        textMessage: string
        contactMobileNumber: string
        cellPhoneNumber: string
        voicePhoneNumber: string
        vehicleInformation: string
        model: string
        requestHelpNow: string
    },
    roadsideAssistance: {
        _4HourRoadsideAssistance: string
        or: string
        submitOnlineRequest: string
        reasonForAssistance: string
        timeSubmitted: string
        name: string
        requestId: string
        status: string
        getStatusHistory: string
        editRoadsideServiceRequest: string
        cancelRequest: string
        features: string
        listItem1: string
        listItem2: string
        listItem3: string
        listItem4: string
        listItem5: string
        listItem6: string
        coverage: string
        coverageDescription: string
        exclusions: string
        exclusionsDescription: string
        contactYourRetailer: string
        description: string
        callToCancelEditRequest: string
    },
    retailerHawaii: {
        retailers: string
        contactRetailer: string
        retailerWebsite: string
    },
    resetPin: {
        newPin: string
        confirmNewPin: string
    },
    remoteServicePinPanel: {
        pinPanel: string
        setPin: string
        pin: string
        confirmPin: string
        biometricsSetupFailed1: string
        biometricsSetupFailed2: string
        biometricsSetupFailed3: string
        biometricsRetrievePinFailed: string
    },
    remoteServiceGen2: {
        starlinkRemoteServices: string
        currentStarlinkPlan: string
        accessStarlinkRemoteServices: string
        remoteEngineStart: string
        remoteEngineStop: string
        remoteClimateControl: string
        remoteClimateControlStart: string
        remoteClimateControlStop: string
        remoteBatteryChargingTimer: string
        locateVehicle: string
        lockDoors: string
        unlockDoors: string
        hornLights: string
        trips: string
    },
    remoteServiceCommunicationsGen2: {
        emailSentTo: string
        textSentTo: string
        remoteServiceCommands: string
        remoteVehicleAlerts: string
        vehicleDiagnosticAlerts: string
        subaruCommunications: string
        sendVehicleLocation: string
        termsConditionsCheckBoxDescription: string
        termsAndConditionsContent: string
        push: string
        pushNotifications: string
        pushNotificationsContent: string
        emailCommunication: string
        textCommunication: string
    },
    remoteServiceCommunications: {
        email: string
        confirmEmail: string
        addAnotherEmailAddress: string
        additionalEmail: string
        confirmEmailAddress: string
        mobilePhone: string
        carrier: string
        select: string
        addAnotherNumber: string
        additionalMobilePhone: string
        primaryPhone: string
        additionalPhone1: string
        additionalPhone2: string
        change: string
    },
    remoteService: {
        currentlySubscribed: string
        accessRemoteServices: string
        vehicleDoesNotHaveRemoteServices: string
        DOOR_AJAR: string
        OTHER: string
        SXM40004: string
        SXM40005: string
        SXM40006: string
        SXM40009: string
        SXM40017: {
            pinLocked: string
            pinLockedG2G3: string
        },
        ServiceAlreadyStarted: string
        NegativeAcknowledge_accOn: string
        NegativeAcknowledge_accIsOn: string
        NegativeAcknowledge_keyInIgnition: string
        NegativeAcknowledge_keyIsInIgnition: string
        NegativeAcknowledge_ignitionOn: string
        NegativeAcknowledge_ignitionIsOn: string
        NegativeAcknowledge_runningOnBackupBattery: string
        NEGATIVE_ACKNOWLEDGE_RUNNINGONBACKUPBATTERY: string
        NegativeAcknowledge_vehicleNotStationary: string
        NegativeAcknowledge_otherCommandsOngoing: string
        NegativeAcknowledge_maxNumRemoteEngineStartExceeded: string
        NegativeAcknowledge_fuelLevelTooLow: string
        NegativeAcknowledge_doorNotClosed: string
        NegativeAcknowledge_engineHoodNotClosed: string
        NegativeAcknowledge_vehicleNotPlugedin: string
        NegativeAcknowledge_vehicleIsNotPluggedin: string
        NegativeAcknowledge_noSlotsLeft: string
        NegativeAcknowledge_securityAlarmOn: string
        NegativeAcknowledge_mfdInUse: string
        DEVICE_NOT_AUTHENTICATED: string
        TimeframePassed_null: string
        InvalidCredentials: {
            invalidPin: string
            lockedPin: string
            lockedPinG2G3: string
            pinNotSet: string
        },
        sxmErrorDefault: string
        sxmErrorDefaultDynamic: string
        unableToRetrieveStatus: string
        unknownDynamic: string
        unknownStatic: string
        commandInProcessUpdating: string
        commandInProcessTrips: string
        valetIsOnError: string
        commandInProcessDynamic1: string
        commandInProcessDynamic2: string
        commandInProcessDefault: string
        accOnDynamic1: string
        accOnDynamic2: string
        accOnDynamic3: string
        accOnDefault: string
        doorNotClosedDynamic1: string
        doorNotClosedPlural: string
        doorNotClosedSingular: string
        doorNotClosedDynamic2: string
        doorNotClosedDynamicSimple: string
        doorNotClosedDefault: string
        engineHoodNotClosed: string
        engineHoodNotClosedDefault: string
        ignitionOnDynamic1: string
        ignitionOnDynamic2: string
        ignitionOnDynamic3: string
        ignitionOnDefault: string
        keyInIgnition: string
        keyInIgnitionDefault: string
        keyInIgnitionStartAnyway: string
        mfdInUseDefault: string
        mfdInUse: string
        runningOnBackupBattery: string
        runningOnBackupBatteryDefault: string
        securityAlarmOn: string
        securityAlarmOnDefault: string
        vehicleNotStationaryDynamic1: string
        vehicleNotStationaryDynamic2: string
        vehicleNotStationaryDynamic3: string
        vehicleNotStationaryDefault: string
        remoteTailgateAccessoryModeError: string
        remoteTailgateIgnitionModeError: string
    },
    remoteEngineStart: {
        createSettings: string
        createNewEngineSetting: string
        createClimateSetting: string
        createClimateAndSeatSetting: string
        createSettingDescription: string
    },
    remoteEngineSetting: {
        engineStart: string
        engineStop: string
        whileEngineIsOn: string
        engineRuntime: string
        _5minutes: string
        _0minutes: string
    },
    remoteEngineReview: {
        summerSetting: string
        deleteSettings: string
        editSettings: string
        winterSetting: string
        createANewSetting: string
        engineStartNotification: string
        pushNotification: string
        engineStopNotification: string
        saveNotification: string
    },
    recalls: {
        noOpenServiceCampaigns: string
        status: string
        description: string
        safetyRisk: string
        remedy: string
        disclaimer: string
        currentCampainsRecalls: string
        noOpenCampainsRecallsMessage: string
        recallHistory: string
    },
    protoLogin: {
        welcome: string
        username: string
        password: string
    },
    processing: {
        doorLocked: string
    },
    poc: {
        title: string
        userId: string
        loginUsername: string
        password: string
        login: string
        usingVin: string
        pin: string
        remoteLock: string
        status: string
    },
    pinPanel: {
        pinRequired: string
        enterYourPin: string
        clear: string
        setupTouchID: string
        enterPinAbove: string
    },
    pageList: {
        listOfPages: string
        protoLogin: string
        login: string
        home: string
        remoteService: string
        pinPanel: string
        forgotPinPanel: string
        securityQuestion: string
        setDelay: string
        legalDisclaimers: string
        retailer: string
        scheduler: string
        helpAndSupport: string
        chooseService: string
        maintenanceSchedule: string
        serviceHistory: string
        scheduleDate: string
        scheduleTime: string
        scheduleSummary: string
        scheduleConfirm: string
        vehicleInformation: string
        processing: string
        myProfile: string
        myProfileView: string
        myProfileEdit: string
        vehicleHealth: string
        demoFill: string
        demoFillForm: string
        starlinkLocation: string
        remoteServiceCommunications: string
        rsc_preview: string
        hornLightPanel: string
        authorizeDevicePanel: string
        larryTest: string
        starlinkPlan: string
        roadsideAssistance: string
        subaruCustomerCare: string
        starlinkCustomerCare: string
        interestsAndActivity: string
        emailSub: string
        mailSub: string
        coupons: string
        events: string
        serviceReminder: string
        searchForRetailer: string
        assignAsRetailer: string
        warranty: string
        addVehicle: string
        manageVehicle: string
        tipsInfo: string
        tipsInformation: string
        tipVideos: string
        tipVideo: string
        tipFAQs: string
        addHistory: string
        rsaForm: string
        rsaStatus: string
        fontTesting: string
        bold: string
        regular: string
        light: string
    },
    noVehicle: {
        oops: string
        noVehicle: string
        goToSubaruToAddAVehicle: string
        logOut: string
    },
    notes: {
        supplyATitle: string
        writeContent: string
    },
    supportPage: {
        experiencingDifficulties: string
        roadsideAssistanceError: string
        cancelThisRequest: string
        rsaCancelled: string
        errorCancellingRsaRequest: string
        unableToGetYourCurrentLocation: string
        unableToLocate: string
        unableToDetermineGeoLocation: string
        geolocationUnavailable: string
        errorUpdatingRsaRequest: string
        rsaHasbeenUpdated: string
        rsaHasbeenRequested: string
        errorSubmittingRsaRequest: string
        roadsideAssistanceRequestFormValidateMessages: {
            firstName: {
                required: string
                minlength: string
                maxlength: string
            },
            middleInitial: {
                maxlength: string
            },
            lastName: {
                required: string
                minlength: string
                maxlength: string
            },
            phone: {
                required: string
                phoneNumber: string
            },
            address1: {
                required: string
                minlength: string
                maxlength: string
            },
            city: {
                required: string
                minlength: string
                maxlength: string
            },
            state: {
                required: string
            },
            zip: {
                required: string
                zipCode: string
            },
            notificationPreferenceCode: {
                required: string
            },
            notificationEmail: {
                required: string
                email: string
                minlength: string
                maxlength: string
            },
            notificationSmsPhone: {
                required: string
                phoneNumber: string
            },
            notificationVoicePhone: {
                required: string
                phoneNumber: string
            },
            reasonCode: {
                required: string
            },
            comment: {
                required: string
                minlength: string
                maxlength: string
                alphanumericSpace: string
                alphanumericSpaceNoSpaceStart: string
                alphanumericSpaceNoSpaceEnd: string
            }
        }
    },
    validation: {
        passwordRules: string
        hasCapitalLetter: string
        hasDigit: string
        alphanumeric: string
        alphanumericWithOutSpace: string
        alphanumericSpace: string
        licensePlate: string
        alphanumericSpace2: string
        alphanumericSpaceNoSpaceStart: string
        alphanumericSpaceNoSpaceEnd: string
        alphanumericSpaceAddress: string
        alphanumericNoSplChar: string
        alphanumericSpecialWithoutSpace: string
        phoneNumber: string
        email: string
        emailSpecialChar: string
        zipCode: string
        nonZeroNumber: string
        inputText: string
        cityValidation: string
        zipcodeUS: string
        vinUS1: string
        creditCardNumber: string
        notEqualTo: string
        phoneValidation: string
        anotherNotEqualTo: string
        alphanumericSpaceWithQuotesAmp: string
    },
    starlinkNotifications: {
        notificationPreferencesValidateMessages: {
            primaryEmail: {
                inputText: string
                email: string
            },
            primaryEmailConfirm: {
                equalTo: string
            },
            additionalEmail: {
                email: string
            },
            additionalEmailConfirm: {
                equalTo: string
            },
            primaryPhone: {
                required: string
                minlength: string
            },
            smsPhone1: {
                required: string
                minlength: string
            },
            smsPhone2: {
                minlength: string
            },
            secondaryPhone: {
                minlength: string
            },
            otherPhone: {
                minlength: string
            },
            smsCarrier1: {
                required: string
            },
            smsCarrier2: {
                required: string
            }
        },
        changesHaveBeenSaved: string
        unableToDisplayYourPreferences: string
        preferenceSettingsError: string
        problemSavingPreferences: string
        mobileNumberRequired: string
        saveNotificationPreferencesValidateMessages: {
            termsAndConditions: {
                required: string
            },
            phone: {
                required: string
                minlength: string
            }
        },
        pushNotificationAlert: string
    },
    starlinkLocationPage: {
        unableToLaunchNavigation: string
        unableToGetYourCurrentLocation: string
        unableToLocate: string
    },
    speedAlertGen2: {
        reachedMaximumNumberOfSpeedAlerts: string
        wantToDelete: string
        speedAlertFormValidateMessages: {
            speedAlertName: {
                required: string
            }
        },
        nameAlreadyExists: string
    },
    services: {
        errorFetchingMaintenanceSchedules: string
        maintenanceScheduleError: string
        serviceEntryValidateMessages: {
            serviceProvider: {
                inputText: string
            },
            mileage: {
                inputText: string
            },
            vehicleNotes: {
                inputText: string
            },
            serviceDate: {
                inputText: string
            }
        },
        serviceEntryUpdated: string
        serviceEntryRemoved: string
        unableToRetrieveServiceHistory: string
        verifyRemoval: string
        addServiceEntryValidateMessages: {
            serviceProvider: {
                inputText: string
            },
            maintenanceInterval: string
            mileage: {
                inputText: string
            },
            vehicleNotes: {
                inputText: string
            },
            serviceDate: {
                inputText: string
            }
        },
        serviceEntryAdded: string
    },
    retailerCenter: {
        invalidZipCode: string
        zipCodeSearch: string
        searchZipFormValidateMessages: {
            zipCode: {
                required: string
                minlength: string
            }
        },
        unableToFetchRetailerInfo_: string
        unableToRetrieveRetailer: string
        unableToUpdateRetailer: string
    },
    remoteEngineStartGen2: {
        stopYourVehicleEngine: string
    },
    remoteCommands: {
        warning: string
        outOfScope: string
        doorsHaveBeenLocked: string
        doorsHaveBeenLockedSingular1: string
        doorsHaveBeenLockedSingular2: string
        doorsHaveBeenLockedSingular3: string
        doorsHaveBeenLockedMultiple: string
        starlinkS: string
        unableToAccessYourAccount: string
        frontDriverDoor: string
        frontPassengerDoor: string
        rearDriverSideDoor: string
        rearPassengerSideDoor: string
        hood: string
        trunk: string
    },
    mileageUpdate: {
        timeToUpdateYourMileage: string
        updateYourMileage: string
        weEstimateYourMileage: string
        thatsNotMyMileage: string
        acceptMileage: string
        enterYourMileage: string
        confirmYourMileage: string
        updatingThisMileageText: string
        mileageUpdated: string
        autoloopUpdateError1: string
        autoloopUpdateError2: string
        mileageUpdatedError: string
    },
    shortcuts: {
        remoteClimateControl: string
        remoteClimateControlDescription: string
        remoteEngineStart: string
        remoteEngineStartDescription: string
        locateVehicle: string
        locateVehicleDescription: string
        unlockVehicle: string
        unlockVehicleDescription: string
        chargeNow: string
        chargeNowDescription: string
        lockDoors: string
        unlockDoors: string
        hornLights: string
        hornLightsDescription: string
        destinations: string
        lockVehicle: string
        lockvehicleDescription: string
        enterServiceHistory: string
        scheduleService: string
        scheduleServiceDescription: string
        roadSideAssistance: string
        roadSideAssistanceDescription: string
        contactDealer: string
        selectPreferredDealer: string
        contactPreferredDealer: string
    },
    whatsNew: {
        skip: string
        next: string
        back: string
        finish: string
        title: string
        autoLoginTitle: string
        autoLoginDescription: string
        autoLoginDescription2: string
        shortcutsTitle: string
        shortcutsDescriptionApple: string
        shortcutsDescriptionAndroid: string
        biometricsTitle: string
        biometricsDescription: string
        biometricsDescriptionContinued: string
        biometricsButton: string
        close: string
        mySubaruChat: string
        experienceDifficulties: string
    },
    _3gSunset: {
        alertBanner1: string
        alertBanner2: string
        pageTitle: string
        pageDescription: string
        faqsHeader: string
        whatIs3GRetirementquestion: string
        whatIs3GRetirementAnswer: string
        whenWill3GRetiredQuestion: string
        whenWill3GRetiredAnswer: string
        whichServicesAffectedQuestion: string
        whichServicesAffectedAnswer: string
        howToContinueUsingQuestion: string
        howToContinueUsingAnswer: string
        whichVehiclesImpactedQuestion: string
        whichVehiclesImpactedAnswer: string
        whatHappensIfNoUpdateQuestion: string
        whatHappensIfNoUpdateAnswer: string
        howToUpdateQuestion: string
        howToUpdateAnswer: string
    },
    remoteServiceCommunicationsGen3: {
        remoteVehicleControls: string
        remoteAlertRearSeat: string
        willNotStart: string
        vehicleMonitoring: string
        driverServicesNotifications: string
        vehicleLocation: string
        vehicleHealthAlerts: string
        billing: string
        textMessages: string
        sendVehicleLocationAtIgnitionOn: string
        billingNotifications: string
        driverAirbag: string
        passengerAirbag: string
        brakeMalfunction: string
        electricAssistedSteering: string
        oilTemperature: string
        hybridChargeLight: string
        oilPressureMalfunction: string
        parkingBreakMalfunction: string
        eyeSight: string
        malfunction: string
        requiresImmediateAttention: string
        itemsCovered: string
        antiLockBrakeMalfunction: string
        awdMalfunction: string
        engineOilLight: string
        hybridMalfunction: string
        tirePressureMonitoringSystem: string
        vehicleDynamicControl: string
        lowWasherFluid: string
        idleStopStart: string
        reverseBrakingMalfunction: string
        blindSpotRearTrafficMalfunction: string
        requiresServiceSoon: string
        remoteServiceCommands: string
        remoteVehicleAlerts: string
        vehicleDiagnosticAlerts: string
        sendVehicleLocation: string
    },
    driverProfileLanding: {
        welcomeToDriverProfile: string
        welcomeMessage: string
        footnote: string
        getStarted: string
        defaultName: string
        used: string
        loadingError: string
        deleteSuccess: string
        deleteFailure: string
        driverProfiles: string
        myDriverProfiles: string
        createCustomDriverProfiles: string
        halfUsed: string
        sendToVehicle: string
        confirmDeleteProfile1: string
        confirmDeleteProfile2: string
        deletProfile: string
    },
    driverProfileSetting: {
        title: string
        profileSettingsError: string
        createError: string
        savedProfile: string
        rearSeatReminder: string
        confirmSaveSettings1: string
        confirmSaveSettings2: string
        driverProfileNameValidationMessage: {
            editProfileName: {
                required: string
                maxlength: string
                alphanumericSpaceWithQuotesAmp: string
            }
        },
        bdayAnnivarsaryValidationMessage: {
            editBdayAnnivName: {
                required: string
                maxlength: string
            },
            editBdayAnnivMonth: {
                required: string
            },
            editBdayAnnivDay: {
                required: string
            }
        },
        deletebdayAnni: string
        deleteConfirm1: string
        deleteConfirm2: string
        disclaimerShowText: string
        disclaimerShowCheckbox: string
    },
    resPresets: {
        resPresets: string
        welcomeToClimateControl: string
        climateControlText: string
        enterClimateControl: string
        climateControlRuntime: string
        subaruPresets: string
        myPresets: string
        editPreset: string
        startEngine: string
        startPhev: string
        fullHeatSettings: string
        createNewPreset: string
        fullHeat: string
        settings: string
        cantEditPresetText: string
        autoPresetText: string
        nameYourPreset: string
        editYourPreset: string
        charactersMaximum: string
        engineRuntime: string
        fanSpeed: string
        additionalDefroster: string
        rearDefroster: string
        driverSeat: string
        heated: string
        cooled: string
        driverLow: string
        driverMedium: string
        driverHigh: string
        passengerSeat: string
        saveSettingsStartEngine: string
        saveSettingsStartEnginePHEV: string
        savePresent: string
        retrievePresetsError: string
        couldNotRetrievePresets: string
        yourSettings: string
        presetSuccessfullySaved: string
        savedPreset: string
        climateControlPresetSucessfullyCreated: string
        presetCreated: string
        savePresetError: string
        deletePresetMessage: string
        deletePresetError: string
        engineRunning: string
        engineRunningClimatePresetError: string
        stopEngine: string
        climateControlRunning: string
        climateControlRunning2: string
        turnOffCC: string
        vehicleHealth1: string
        vehicleHealth2: string
        engineCurrentlyRunning: string
        engineCurrentlyRunningPHEV: string
        presetNameValidationMessage: {
            name: {
                required: string
                maxlength: string
                alphanumericSpaceWithQuotesAmp: string
            }
        }
    },
    valetMode: {
        valet: string
        valetMode: string
        skip: string
        valetModeSetup: string
        remoteRestrction: string
        welcome: string
        valetInfo: string
        goToSetUp: string
        forgotPasscode: string
        okay: string
        valetError: string
        valetModeRequires: string
        alredayHasSetup: string
        enableSpeedAlert: string
        activatingValetMode: string
        valetModeAcknowledgement: string
        activeValetMode: string
        activeValetModeFeature: string
        saveAndContinue: string
        speedAlertNotify: string
        speedAlert: string
        speedLimit: string
        trackVehicleLocation: string
        vehicleLocation: string
        trackingVehilceOnMotion: string
        trackingVehilceOnMotionOn: string
        notifyMe: string
        trackYourVehicle: string
        notifyMeLocation: string
        restrictRES: string
        vehicleLoacation: string
        resStarNowOff: string
        restrictRESParking: string
        activateValetModeNext: string
        notifyFirst: string
        notificationOption: string
        activateValetMode: string
        activating: string
        active: string
        savedSuccessfully: string
        notifySpeedExceeds: string
        parkedEnclosedSpace: string
        vehicleInOperation: string
        notifyVehicleTurnedOn: string
        restrictRESStart: string
        vehicleTurnedOn: string
        saveAndSendSettings: string
        updateNotificationOptions: string
        configurationInfo: string
        configurationInfo2: string
        deactivate: string
        locateDetails: string
        notificationOptions: string
        on: string
        off: string
        receiveNotification: string
        speedNotificationActive: string
        screen2: string
        cannotStartValetMode: string
        valetModeOnAlertHeaderError: string
        valetModeOnAlert: string
        editCommunicationPreferences: string
        deactivateValetMode: string
        notificationPreferences: string
        changingTheseNotificationPreferences: string
        mailAlert: string
        saveNotificationPreferences: string
        viewLocationDetails: string
        valetRefresh: string
        passcodeReset: string
        passcodeResetDesc: string
        resetPasscode: string
        valetPasscodeReset: string
        iAcknowledge: string
        saveSettings: string
        sentFirst: string
        activateInVehicle: string
        deactivateInVehicle: string
        settings: string
    },
    tripTrackerLanding: {
        tripDates: string
        tripLogs: string
        miles: string
        milesLC: string
        stopMyTrip: string
        stopTripConfirmButtonLabel: string
        stopTripConfirmCancelLabel: string
        stopMyTripMessage1: string
        stopMyTripMessage2: string
        drivingJournals: string
        pleaseSelectOneTripToAddToJournal: string
        createNewDrivingJournal: string
        deleteAllDrivingJournal: string
        confirmDelete: string
        confirmJournalEntryDelete: string
        confirmLastJournalEntryDelete1: string
        confirmLastJournalEntryDelete2: string
        confirmDeleteAllJournal: string
        deleteJournalTitle: string
        deleteFromDrivingJournal: string
        deleteAllJournalTitle: string
        deleteSuccessMsg: string
        deleteJournalSuccessMsg: string
        max10DrivingJournals: string
        odometerStart: string
        odometerEnd: string
        fuelConsumption: string
        remainingFuel: string
        milesPerGallon: string
        youCurrentlyHave: string
        tripLogsSelected: string
        noSavedDrivingJournals: string
        noTripLogsFound: string
        view: string
        successfulTripUpdate: string
        tripDuration: string
        noTripLogs: string
    },
    vehicleDiagnostics: {
        vehicleDiagnostics: string
        odometer: string
        airbag: {
            header: string
            style: string
            description: string
        },
        awd: {
            header: string
            style: string
            description: string
        },
        abs: {
            header: string
            style: string
            description: string
        },
        oilTemp: {
            header: string
            style: string
            description: string
        },
        blindspot: {
            header: string
            style: string
            description: string
        },
        chargeSystem: {
            header: string
            style: string
            description: string
        },
        engineFail: {
            header: string
            style: string
            description: string
        },
        ebd: {
            header: string
            style: string
            description: string
        },
        pkgBrake: {
            header: string
            style: string
            description: string
        },
        oilWarning: {
            header: string
            style: string
            description: string
        },
        eyesight: {
            header: string
            style: string
            description: string
        },
        hybridSystem: {
            header: string
            style: string
            description: string
        },
        iss: {
            header: string
            style: string
            description: string
        },
        oilPres: {
            header: string
            style: string
            description: string
        },
        passairbag: {
            header: string
            style: string
            description: string
            warning: {
                style: string
                description: string
            }
        },
        epas: {
            header: string
            style: string
            description: string
        },
        revBrake: {
            header: string
            style: string
            description: string
        },
        telematics: {
            header: string
            style: string
            description: string
        },
        tpms: {
            header: string
            style: string
            description: string
        },
        vdc: {
            header: string
            style: string
            description: string
        },
        washer: {
            header: string
            style: string
            description: string
        },
        srh: {
            header: string
            style: string
            description: string
        },
        ahbl: {
            header: string
            style: string
            description: string
        },
        pedairbag: {
            header: string
            style: string
            description: string
        },
        provisionError: {
            header: string
            style: string
            description: string
        },
        refreshData: string
        conditionCheck: string
        healthReport: string
        tiresGood: string
        lowTires: string
        viewDetails: string
        windowsClosed: string
        openWindows: string
        miKM: string
        monthService: string
        viewDetails2: string
        viewMaintenanceSchedule: string
        tirePressurePSI: string
        driverSideFront: string
        passengerSideFront: string
        driverSideRear: string
        passengerSideRear: string
        recommended: string
        viewTirePromotions: string
        windows: string
        moonroof: string
        closed: string
        open: string
        fuel: string
        empty: string
        full: string
        untilEmpty: string
        averageMPG: string
        dateRange: string
        current: string
        representedAlerts: string
        and: string
        systemIndicators: string
        reportIssue: string
        interestedInIssueCheckOut: string
        systemsFunctioningNormally: string
        disclaimer: string
        tirePressureInfoTitle: string
        tirePressureInfo1: string
        tirePressureInfo2: string
        tirePressureInfo3: string
        VehicleInfoMessage: string
    },
    collisionCenter: {
        banner: {
            bannerTitle: string
            bannerContent: string
            bannerButton: string
        },
        mainContent: string
        whySubaruparts: {
            title: string
            maindescription: string
            fit: {
                title: string
                description: string
                footer: string
            },
            safety: {
                title: string
                description: string
                footer1: string
                footer2: string
            },
            quality: {
                title: string
                description: string
            }
        }
    }
}


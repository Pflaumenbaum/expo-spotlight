//
//  DelegateSubscriber.swift
//
//  Created by Pflaumenbaum on 26.01.26.
//

import ExpoModulesCore
import CoreSpotlight

public class SpotlightAppDelegateSubscriber: ExpoAppDelegateSubscriber {
  var running: Bool = false
  public func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    
    guard userActivity.activityType == CSSearchableItemActionType,
          let identifier = userActivity.userInfo?[CSSearchableItemActivityIdentifier] as? String
    else {
      return false
    }
    if(!running){
      UserDefaults.standard.set(identifier, forKey: "ExpoSpotlight.CashedItem")
    }
    
    NotificationCenter.default.post(
      name: Notification.Name("ExpoSpotlightItemTapped"),
      object: nil,
      userInfo: ["id": identifier]
    )
    running = true
    
    return true
  }
}

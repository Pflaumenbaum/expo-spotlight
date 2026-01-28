//
//  ExpoSpotlightModule.swift
//
//  Created by Pflaumenbaum on 26.01.26.
//

import ExpoModulesCore
import CoreSpotlight
import UniformTypeIdentifiers

public class ExpoSpotlightModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSpotlight")
    Events("onSpotlightItemTapped")
    
    OnCreate {
      NotificationCenter.default.addObserver(
        forName: Notification.Name("ExpoSpotlightItemTapped"),
        object: nil,
        queue: .main
      ) { notification in
        if let id = notification.userInfo?["id"] as? String {
          self.sendEvent("onSpotlightItemTapped", ["id": id])
        }
      }
    }
    
    AsyncFunction("indexItems") { (items: [[String: Any]]) in
      
      var searchableItems: [CSSearchableItem] = []
      
      for item in items {
        
        guard
          let id = item["id"] as? String,
          let title = item["title"] as? String,
          let domainIdentifier = item["domainIdentifier"] as? String
        else {
          continue
        }
        
        let attributes = CSSearchableItemAttributeSet(
          itemContentType: UTType.item.identifier
        )
        
        attributes.title = title
        attributes.contentDescription = item["description"] as? String
        
        
        if let thumbnail = item["thumbnail"] as? [String: Any] {
          
          if let base64 = thumbnail["base64"] as? String,
             let data = Data(base64Encoded: base64) {
            attributes.thumbnailData = data
          }
          
          if let urlString = thumbnail["url"] as? String,
             let fileUrl = URL(string: urlString) {
            attributes.thumbnailURL = fileUrl
          }
          
          if let darkUrlString = thumbnail["darkUrl"] as? String,
             let darkFileUrl = URL(string: darkUrlString) {
            attributes.darkThumbnailURL = darkFileUrl
          }
          
        }
        
        if let metadata = item["metadata"] as? [String: Any] {
          
          if let keywords = metadata["keywords"] as? [String] {
            attributes.keywords = keywords
          }
          if let contentType = metadata["contentType"] as? String {
            attributes.contentType = contentType
          }
          if let copyright = metadata["copyright"] as? String {
            attributes.copyright = copyright
          }
          if let url = metadata["url"] as? String {
            attributes.url = URL(string: url)
          }
          if let rankingHint = metadata["rankingHint"] as? NSNumber {
            attributes.rankingHint = rankingHint
          }
          if let location = metadata["location"] as? [String: Any] {
            
            if let lat = location["latitude"] as? NSNumber,
               let lon = location["longitude"] as? NSNumber {
              attributes.latitude = lat
              attributes.longitude = lon
            }
            if let alatitude = location["altitude"] as? NSNumber {
              attributes.altitude = alatitude
            }
            if let name = location["name"] as? String {
              attributes.namedLocation = name
            }
            
          }
          if let createdAt = metadata["createdAt"] as? Double {
            attributes.contentCreationDate =
            Date(timeIntervalSince1970: createdAt)
          }
          
          if let updatedAt = metadata["updatedAt"] as? Double {
            attributes.contentModificationDate =
            Date(timeIntervalSince1970: updatedAt)
          }
          if let endDate = metadata["endDate"] as? Double {
            attributes.endDate =
            Date(timeIntervalSince1970: endDate)
          }
          if let dueDate = metadata["dueDate"] as? Double {
            attributes.dueDate =
            Date(timeIntervalSince1970: dueDate)
          }
          if let startDate = metadata["startDate"] as? Double {
            attributes.startDate =
            Date(timeIntervalSince1970: startDate)
          }
          if let addedDate = metadata["addedDate"] as? Double {
            attributes.addedDate =
            Date(timeIntervalSince1970: addedDate)
          }
          
        }
        
        searchableItems.append(
          CSSearchableItem(
            uniqueIdentifier: id,
            domainIdentifier: domainIdentifier,
            attributeSet: attributes
          )
        )
      }
      
      CSSearchableIndex.default().indexSearchableItems(searchableItems)
    }
    
    AsyncFunction("clearAll") {
      CSSearchableIndex.default().deleteAllSearchableItems()
    }
    
    
    AsyncFunction("clearDomain") { (domain: String) in
      CSSearchableIndex.default()
        .deleteSearchableItems(withDomainIdentifiers: [domain])
    }
    
    AsyncFunction("removeItem") { (id: String) in
      CSSearchableIndex.default()
        .deleteSearchableItems(withIdentifiers: [id])
    }
  }
}

package com.mealtracker.springdatarest;

import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.ExecutionException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

@SpringBootApplication
public class MealtrackerApi2Application {
	
	static Firestore db;

	public static void main(String[] args) throws IOException, InterruptedException, ExecutionException {
		InputStream accessKey = MealtrackerApi2Application.class.getResourceAsStream("firebasejson.json"); 
			
		FirebaseOptions options = new FirebaseOptions.Builder()
		    .setCredentials(GoogleCredentials.fromStream(accessKey))
		    .setProjectId("mealplannercapst-1546462212187")
		    .setDatabaseUrl("https://mealplannercapst-1546462212187.firebaseio.com")
		    .build();
		FirebaseApp.initializeApp(options);
		
		
		MealtrackerApi2Application.db = FirestoreClient.getFirestore();
		
		
//		
//		// Create a reference to the cities collection
//		CollectionReference image = MealtrackerApi2Application.db.collection("mealtracker");
//		// Create a query against the collection.
//		Query query = image.whereEqualTo("image", "blah");
//		// retrieve  query results asynchronously using query.get()
//		ApiFuture<QuerySnapshot> querySnapshot = query.get();
//
//		for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
//		  System.out.println(document.getId());
//		}
//		System.out.println("done");
//		
////		System.out.println(db.collection("mealtracker").document("CHDz7asKyqBIm0mqtY2T").get().get().get("image"));
//		System.exit(0);
//		
		SpringApplication.run(MealtrackerApi2Application.class, args);
	}

}


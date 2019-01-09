package com.mealtracker.springdatarest;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.client.JerseyClient;
import org.glassfish.jersey.client.JerseyClientBuilder;
import org.glassfish.jersey.client.JerseyWebTarget;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@RestController
public class RecipeController {

	@Component
	public class CorsFilter extends OncePerRequestFilter {

		@Override
		protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
				final FilterChain filterChain) throws ServletException, IOException {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, HEAD, OPTIONS");
			response.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
			response.addHeader("Access-Control-Expose-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
			response.addHeader("Access-Control-Allow-Credentials", "true");
			response.addIntHeader("Access-Control-Max-Age", 10);
			filterChain.doFilter(request, response);
		}
	}





	JerseyClient client = JerseyClientBuilder.createClient();

	@RequestMapping("/search")
	public String index(@RequestParam(value = "ingredients") String ingredients) {

		String url = "https://api.edamam.com/search?app_id=9ec67616&app_key=b72cb771686e21c301a08adc32727f23&q="
				+ ingredients;
		JerseyWebTarget webTarget = client.target(url);

		Response response = webTarget.request().get();

		return response.readEntity(String.class);

	}

	@RequestMapping(value = "/addrecipe", method = RequestMethod.POST)
	public String addRecipe(@RequestParam(value = "id") String id, @RequestParam(value = "useruid") String useruid)
			throws UnsupportedEncodingException, InterruptedException, ExecutionException {
		id = URLEncoder.encode(id, "UTF-8");
		String url = "https://api.edamam.com/search?app_id=9ec67616&app_key=b72cb771686e21c301a08adc32727f23&r=" + id;
		JerseyWebTarget webTarget = client.target(url);

		Response response = webTarget.request().get();

		String jsonResponse = response.readEntity(String.class);

		JSONArray jsonArray = new JSONArray(jsonResponse);

		String label = jsonArray.getJSONObject(0).getString("label");

		String image = jsonArray.getJSONObject(0).getString("image");

		String recipeUrl = jsonArray.getJSONObject(0).getString("url");

		List<Object> healthLabels = jsonArray.getJSONObject(0).getJSONArray("healthLabels").toList();

		List<Object> ingredients = jsonArray.getJSONObject(0).getJSONArray("ingredients").toList();

		Map<String, Object> data = new HashMap<>();
		data.put("label", label);
		data.put("image", image);
		data.put("url", url);
		data.put("healthLables", healthLabels);
		data.put("ingredients", ingredients);
		data.put("useruid", useruid);

		DocumentReference docRef = MealtrackerApi2Application.db.collection("mealtracker").document();

		// asynchronously write data
		ApiFuture<WriteResult> result = docRef.set(data);

		return result.get().getUpdateTime().toString();

	}


	@RequestMapping(value = "/myrecipes", method = RequestMethod.GET)
	public List<Map<String, Object>> getMyRecipes(@RequestParam(value = "useruid") String useruid) throws InterruptedException, ExecutionException {
		CollectionReference database = MealtrackerApi2Application.db.collection("mealtracker");
		Query query = database.whereEqualTo("useruid", useruid);

		ApiFuture<QuerySnapshot> querySnapshot = query.get();

		List<Map<String, Object>> myList = new ArrayList<>();

		for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
			myList.add(document.getData());
		}

		return myList;
	}


	@RequestMapping(value = "/recipe", method = RequestMethod.DELETE)
	public String deleteRecipe(@RequestParam(value = "id") String id) {
		return "blah";
	}

}

from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS
import joblib
import math
import json as json_module  # import Python's built-in json module for printing
import warnings
# Load the model from the file
loaded_regressor = joblib.load('knn_regressor_model.pkl')

# Suppress specific sklearn warnings
warnings.filterwarnings(action='ignore', category=UserWarning)
# Load the model from the file
loaded_regressor = joblib.load('knn_regressor_model.pkl')

app = Sanic("ProjectionDataReceiver")
CORS(app)

# This will store all the predictions during the session
all_predictions = []

@app.route("/", methods=["POST"])
async def receive_data(request):
    # Check if the request has a JSON body
    if not request.json:
        return json({'message': 'No JSON body found or Content-Type is not application/json'}, status=400)

    datas = request.json
    # Assuming datas should be a list of lists for KNN regression
    if not (isinstance(datas, list) and all(isinstance(item, list) for item in datas)):
        return json({'message': 'JSON body must be an array of arrays'}, status=400)

    predictions = []
    for new_data in datas:
        # Make a prediction using the trained model for each new_data
        predicted_demand = loaded_regressor.predict([new_data])
        rounded_demand = math.floor(predicted_demand[0])
        predictions.append(rounded_demand)
        all_predictions.append({"input": new_data, "predicted_demand": rounded_demand})

        # print on terminal,有冇都okay
        # print("Predicted demand = {}".format(rounded_demand)) 

    # Return all the predictions as a JSON response
    return json({"Predicted demands": predictions})

@app.route("/", methods=["GET"])
async def get_predictions(request):


    # print on terminal,有冇都okay
    # for prediction in all_predictions:
        # print(json_module.dumps(prediction))  
    
    # Use Python's json module to print
    # Return all the stored predictions as a JSON response
    return json({"All Predicted Demands": all_predictions})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)
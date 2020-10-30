using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace XooErp.classes
{
    public class clsCommon
    {
        public static string GenerateRandomString(int nNoChars)
        {
            string finalString = "";
            try
            {

                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var stringChars = new char[nNoChars];
                var random = new Random();

                for (int i = 0; i < stringChars.Length; i++)
                {
                    stringChars[i] = chars[random.Next(chars.Length)];
                }

                finalString = new String(stringChars);
            }
            catch (Exception e)
            {

            }
            return finalString;
        }



        //string[,] paramsArray = new string[,]
        //{
        //    {"@ShipmentId", "123456"},
        //    {"@TransDate", "2016-01-25"},
        //    {"@FromLocation", "123"},
        //    {"@ToLocation", "456"},
        //    {"@Status", "Delivered"},
        //    {"@TrackingNo", "1Z456789123"},
        //    {"@UpdatedAtCarrier", DateTime.Now.ToString()},
        //};
        
        public static void SqlStoredProcedureParamArrayNoReturn(string dbConnection, string procName, string[,] paramArray)
        {
          
            using (SqlConnection conn = new SqlConnection(dbConnection))
            {
                SqlCommand cmd = new SqlCommand(procName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                for (int r = 0; r < paramArray.GetLength(0); r++)
                {
                    cmd.Parameters.Add(new SqlParameter(paramArray[r, 0], paramArray[r, 1]));
                }
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                System.Diagnostics.Debug.WriteLine("SQL Command executed successfully.");
                              
            }
        }

        public static int SqlStoredProcedureParamArrayWithReturn(string dbConnection, string procName, string[,] paramArrayInput, string[,] paramArrayOutput)
        {
            int intReturn = 0;
            using (SqlConnection conn = new SqlConnection(dbConnection))
            {
                SqlCommand cmd = new SqlCommand(procName, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                //add input parameters
                for (int r = 0; r < paramArrayInput.GetLength(0); r++)
                {
                    cmd.Parameters.Add(new SqlParameter(paramArrayInput[r, 0], paramArrayInput[r, 1]));
                }

                //add output parameters
                for (int r = 0; r < paramArrayOutput.GetLength(0); r++)
                {
                    cmd.Parameters.Add(new SqlParameter(paramArrayOutput[r, 0], paramArrayOutput[r, 1]).Direction = ParameterDirection.Output);
                }

                //add return parameter
                cmd.Parameters.Add(new SqlParameter("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue);

                cmd.Connection.Open();
                cmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(cmd.Parameters["@intRet"].Value);
                //System.Diagnostics.Debug.WriteLine("SQL Command executed successfully.");

                cmd.Dispose();
                conn.Close();
                conn.Dispose();

            }

            return intReturn;
        }

    }
}
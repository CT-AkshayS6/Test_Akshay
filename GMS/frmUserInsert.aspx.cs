using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.UI.HtmlControls;

namespace GMS
{
    public partial class frmUserInsert : System.Web.UI.Page
    {
        static string strConn = ConfigurationSettings.AppSettings["strCon"];

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Convert.ToString(Session["user_id"]) == "")
                {
                    Response.Redirect("index.aspx");
                }

            }
        }

        [System.Web.Services.WebMethod]
        public static string fnUserInsert(string strFirstName , string strLastName 
            , string strEmail , string strMobile , string strLevel)
        {
            int intReturn = 0;

            try
            {
                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_user_insert", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(HttpContext.Current.Session["user_id"]);
                
                objCmd.Parameters.Add("@user_fname", SqlDbType.VarChar, 30).Value = strFirstName;

                if (strLastName == "")
                {
                    objCmd.Parameters.Add("@user_lname", SqlDbType.VarChar, 30).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@user_lname", SqlDbType.VarChar, 30).Value = strLastName;
                }

                objCmd.Parameters.Add("@user_email", SqlDbType.VarChar, 30).Value = strEmail;

                objCmd.Parameters.Add("@user_mobile", SqlDbType.VarChar, 15).Value = strMobile;

               objCmd.Parameters.Add("@user_level", SqlDbType.BigInt).Value = Convert.ToInt64(strLevel);


                objCmd.Parameters.Add("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }
                objCmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(objCmd.Parameters["@intRet"].Value);

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                intReturn = -1;
            }

            return intReturn.ToString();
        }


        [System.Web.Services.WebMethod]
        public static string fnUserUpdate( string strFirstName, string strLastName
            , string strEmail, string strMobile, string strLevel, string strId)
        {
            int intReturn = 0;

            try
            {

                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_user_update", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;               

                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(strId);
                
                objCmd.Parameters.Add("@user_fname", SqlDbType.VarChar, 30).Value = strFirstName;

                if (strLastName == "")
                {
                    objCmd.Parameters.Add("@user_lname", SqlDbType.VarChar, 30).Value = System.DBNull.Value;
                }

                else
                {
                    objCmd.Parameters.Add("@user_lname", SqlDbType.VarChar, 30).Value = strLastName;
                }

                objCmd.Parameters.Add("@user_email", SqlDbType.VarChar, 30).Value = strEmail;

                objCmd.Parameters.Add("@user_mobile", SqlDbType.VarChar, 15).Value = strMobile;
                
                objCmd.Parameters.Add("@user_level", SqlDbType.BigInt).Value = Convert.ToInt64(strLevel);

                objCmd.Parameters.Add("@intRet", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }
                objCmd.ExecuteNonQuery();

                intReturn = Convert.ToInt16(objCmd.Parameters["@intRet"].Value);

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                intReturn = -1;
            }

            return intReturn.ToString();
        }


        [System.Web.Services.WebMethod]
        public static string fnGetUserDetails(string intId)
        {
            string strXml = "";
            try
            {

                SqlConnection objCon = new SqlConnection(strConn);
                SqlCommand objCmd = new SqlCommand("wb_user_details_select", objCon);
                objCmd.CommandType = CommandType.StoredProcedure;
                
                objCmd.Parameters.Add("@user_id", SqlDbType.BigInt).Value = Convert.ToInt64(intId);

                if (objCon.State == ConnectionState.Closed)
                {
                    objCon.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                da.SelectCommand = objCmd;
                da.Fill(ds);

                strXml = ds.GetXml();
                strXml = strXml.Replace("NewDataSet", "data");
                strXml = strXml.Replace("Table", "row");

                objCmd.Dispose();
                objCon.Close();
                objCon.Dispose();

            }
            catch (Exception e)
            {
                return "-1";
            }

            return strXml;
        }
    }
}
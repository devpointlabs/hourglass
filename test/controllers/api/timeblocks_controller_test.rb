require 'test_helper'

class Api::TimeblocksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_timeblocks_index_url
    assert_response :success
  end

  test "should get show" do
    get api_timeblocks_show_url
    assert_response :success
  end

  test "should get create" do
    get api_timeblocks_create_url
    assert_response :success
  end

  test "should get update" do
    get api_timeblocks_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_timeblocks_destroy_url
    assert_response :success
  end

end
